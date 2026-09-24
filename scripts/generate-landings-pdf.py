"""Generate PDF explaining /asesoria campaign landing pages."""

from __future__ import annotations

import os

from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "docs")
OUT_PATH = os.path.abspath(os.path.join(OUT_DIR, "landings-asesoria-aterrizaje.pdf"))

BRAND = HexColor("#07234c")
ACCENT = HexColor("#b38b59")
MUTED = HexColor("#475569")
LIGHT = HexColor("#f7f7f3")
LINE = HexColor("#d1d5db")


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="CoverTitle",
            fontName="Helvetica-Bold",
            fontSize=26,
            leading=32,
            textColor=BRAND,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverSub",
            fontName="Helvetica",
            fontSize=12,
            leading=16,
            textColor=MUTED,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H1",
            fontName="Helvetica-Bold",
            fontSize=16,
            leading=20,
            textColor=BRAND,
            spaceBefore=16,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H2",
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=16,
            textColor=BRAND,
            spaceBefore=12,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            textColor=MUTED,
            alignment=TA_JUSTIFY,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BulletItem",
            fontName="Helvetica",
            fontSize=10,
            leading=13,
            textColor=MUTED,
            leftIndent=12,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Small",
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=MUTED,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableCell",
            fontName="Helvetica",
            fontSize=8,
            leading=10,
            textColor=BRAND,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableHead",
            fontName="Helvetica-Bold",
            fontSize=8,
            leading=10,
            textColor=white,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Mono",
            fontName="Courier",
            fontSize=8,
            leading=10,
            textColor=BRAND,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Footer",
            fontName="Helvetica",
            fontSize=8,
            textColor=MUTED,
            alignment=TA_CENTER,
        )
    )
    return styles


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BRAND)
    canvas.rect(0, A4[1] - 18, A4[0], 18, fill=1, stroke=0)
    canvas.setFillColor(white)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(2 * cm, A4[1] - 12, "Familia Internacional — Landings de aterrizaje /asesoria")
    canvas.setFillColor(LINE)
    canvas.rect(0, 0, A4[0], 16, fill=1, stroke=0)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawCentredString(A4[0] / 2, 5, f"Pagina {doc.page}")
    canvas.restoreState()


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    styles = build_styles()

    doc = SimpleDocTemplate(
        OUT_PATH,
        pagesize=A4,
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        topMargin=2.2 * cm,
        bottomMargin=1.8 * cm,
    )

    story = []

    story.append(Paragraph("Landings de aterrizaje", styles["CoverTitle"]))
    story.append(
        Paragraph(
            "Rutas /asesoria — campanas de captacion de leads",
            styles["CoverSub"],
        )
    )
    story.append(
        Paragraph(
            "Familia Internacional · Documento interno de producto",
            styles["CoverSub"],
        )
    )
    story.append(Paragraph("Julio 2026", styles["CoverSub"]))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=2, color=ACCENT, spaceAfter=14))

    story.append(Paragraph("1. Que son estas landings", styles["H1"]))
    story.append(
        Paragraph(
            "Las landings de aterrizaje son paginas orientadas a campanas publicitarias "
            "(Google Ads, Meta u otros canales). Su objetivo no es explicar todo el estudio, "
            "sino convertir trafico caliente en un lead: el visitante llega con un problema "
            "concreto, ve un mensaje alineado a ese problema y completa un formulario o "
            "escribe por WhatsApp.",
            styles["Body"],
        )
    )
    story.append(
        Paragraph(
            "Viven bajo la ruta <b>/asesoria/[tema]</b>. Son distintas de las paginas de "
            "servicio en <b>/servicios/[slug]</b>, pensadas para SEO organico y detalle de "
            "materia. Las landings priorizan urgencia, formulario visible y un mensaje corto "
            "de conversion.",
            styles["Body"],
        )
    )

    story.append(Paragraph("2. Como se usan en campanas", styles["H1"]))
    for item in [
        "<b>URL de destino del anuncio:</b> https://www.familiainternacional.cl/asesoria/[slug]",
        "<b>Landing general:</b> /asesoria/familia-internacional (tambien es el redirect de /asesoria).",
        "<b>Landings por materia:</b> una por cada area de practica (divorcio, exequatur, sustraccion, etc.).",
        "<b>Lead source:</b> cada landing marca el origen del lead (ej. ads_asesoria_divorcios-internacionales) para medir que campana convierte.",
        "<b>CTAs:</b> formulario en el hero + WhatsApp como canal secundario.",
    ]:
        story.append(Paragraph(f"• {item}", styles["BulletItem"]))

    story.append(Paragraph("3. Inventario de URLs", styles["H1"]))
    story.append(
        Paragraph(
            "Base: <b>https://www.familiainternacional.cl</b>. El indice <b>/asesoria</b> "
            "redirige a la landing general.",
            styles["Body"],
        )
    )

    rows = [
        [
            Paragraph("<b>URL</b>", styles["TableHead"]),
            Paragraph("<b>Tema / uso</b>", styles["TableHead"]),
            Paragraph("<b>Lead source</b>", styles["TableHead"]),
        ]
    ]

    landings = [
        (
            "/asesoria/familia-internacional",
            "Landing general de campana",
            "ads_asesoria_familia_internacional",
        ),
        (
            "/asesoria/divorcios-internacionales",
            "Divorcios internacionales",
            "ads_asesoria_divorcios-internacionales",
        ),
        (
            "/asesoria/exequatur",
            "Exequatur (validacion de sentencias)",
            "ads_asesoria_exequatur",
        ),
        (
            "/asesoria/cuidado-sustraccion",
            "Sustraccion / cuidado / visitas",
            "ads_asesoria_cuidado-sustraccion",
        ),
        (
            "/asesoria/autorizaciones-salida-pais",
            "Autorizaciones para salir del pais",
            "ads_asesoria_autorizaciones-salida-pais",
        ),
        (
            "/asesoria/filiacion-alimentos",
            "Filiacion y alimentos internacionales",
            "ads_asesoria_filiacion-alimentos",
        ),
        (
            "/asesoria/herencias-internacionales",
            "Herencias y posesiones efectivas",
            "ads_asesoria_herencias-internacionales",
        ),
        (
            "/asesoria/tramites-consulares",
            "Tramites consulares y representacion",
            "ads_asesoria_tramites-consulares",
        ),
    ]

    for url, tema, source in landings:
        rows.append(
            [
                Paragraph(url, styles["Mono"]),
                Paragraph(tema, styles["TableCell"]),
                Paragraph(source, styles["Mono"]),
            ]
        )

    table = Table(rows, colWidths=[6.8 * cm, 5.5 * cm, 5.2 * cm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BRAND),
                ("BACKGROUND", (0, 1), (-1, -1), white),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, LIGHT]),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
            ]
        )
    )
    story.append(table)

    story.append(Paragraph("4. Estructura de cada landing", styles["H1"]))
    story.append(
        Paragraph(
            "Todas las landings comparten el mismo layout. Solo cambian textos, imagen, FAQs "
            "y el leadSource segun el tema.",
            styles["Body"],
        )
    )

    sections = [
        ("Header fijo", "Logo, boton WhatsApp y CTA hacia el formulario."),
        (
            "Hero + formulario",
            'Titulo, descripcion, urgencia, proof points y formulario "Cuente su caso" '
            "embebido a la derecha (desktop).",
        ),
        ("Cuando conviene consultar", "4 pain points del caso tipico (problemas frecuentes)."),
        (
            "Que incluye la asesoria",
            "4 bloques de valor: diagnostico, competencia, documentos, riesgos/plazos.",
        ),
        (
            "Como trabajamos",
            "3 pasos compartidos: contar situacion, revisar camino legal y definir siguiente paso.",
        ),
        (
            "Alcance del servicio",
            "Includes de la materia vinculada (desde service-landings) o includes de asesoria general.",
        ),
        ("Resenas Google", "Bloque de prueba social (3 resenas)."),
        ("FAQs", "Preguntas frecuentes del tema para reducir friccion antes de agendar."),
        ("CTA final", "Segundo llamado a formulario / WhatsApp."),
        ("Otras asesorias", "Links a 3 landings relacionadas."),
        ("Footer", "Footer institucional del sitio."),
    ]
    for title, desc in sections:
        story.append(Paragraph(f"• <b>{title}:</b> {desc}", styles["BulletItem"]))

    story.append(Paragraph("5. Landing general vs landings por materia", styles["H1"]))
    story.append(Paragraph("General — familia-internacional", styles["H2"]))
    story.append(
        Paragraph(
            "Sirve cuando el anuncio es amplio (abogado familia internacional, caso Chile + otro pais). "
            "Habla de varios temas a la vez y captura leads que aun no tienen materia clara. "
            'Titulo: "Asesoria para casos de familia internacional". CTA: "Agendar asesoria".',
            styles["Body"],
        )
    )
    story.append(Paragraph("Por materia — 7 landings", styles["H2"]))
    story.append(
        Paragraph(
            "Se generan automaticamente desde las areas de practica (serviceLandings). Cada una "
            "reutiliza titulo/descripcion de CTA, problemas, FAQs e imagen del servicio "
            "correspondiente. Conviene usarlas cuando el anuncio ya apunta a un tema "
            "(ej. divorcio conyuge en el extranjero → /asesoria/divorcios-internacionales).",
            styles["Body"],
        )
    )

    story.append(Paragraph("6. Medicion y formularios", styles["H1"]))
    for item in [
        "El formulario usa el componente EvaluaTuCasoForm con variant light.",
        "Cada envio guarda un <b>leadSource</b> distinto segun la landing (prefijo ads_asesoria_).",
        "Eso permite en admin/CRM filtrar leads por campana o materia.",
        "WhatsApp abre el widget configurado del sitio, como canal paralelo al formulario.",
    ]:
        story.append(Paragraph(f"• {item}", styles["BulletItem"]))

    story.append(Paragraph("7. Donde se configura en el codigo", styles["H1"]))
    for item in [
        "<b>src/config/campaign-landings.ts</b> — catalogo de landings, textos, FAQs, leadSource, proof points.",
        "<b>src/app/asesoria/page.tsx</b> — redirect de /asesoria → /asesoria/familia-internacional.",
        "<b>src/app/asesoria/[tema]/page.tsx</b> — plantilla visual compartida.",
        "<b>src/config/service-landings.ts</b> — fuente de contenido de las 7 landings por materia.",
    ]:
        story.append(Paragraph(f"• {item}", styles["BulletItem"]))

    story.append(Paragraph("8. Recomendacion de uso en Ads", styles["H1"]))
    for item in [
        "1 anuncio / grupo de anuncios → 1 landing alineada al keyword o creativo.",
        "No enviar trafico de sustraccion a la landing general si ya existe la especifica.",
        "Usar la general solo para campanas de awareness o keywords amplias.",
        "Revisar en CRM la conversion por leadSource para pausar o escalar campanas.",
        "Mantener mensaje del anuncio coherente con el H1 y la linea de urgencia de la landing.",
    ]:
        story.append(Paragraph(f"• {item}", styles["BulletItem"]))

    story.append(Spacer(1, 14))
    story.append(HRFlowable(width="100%", thickness=1, color=LINE, spaceAfter=8))
    story.append(
        Paragraph(
            "Documento generado a partir de la implementacion actual de /asesoria en el "
            "repositorio Familia Internacional.",
            styles["Small"],
        )
    )

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(OUT_PATH)
    print(f"OK {os.path.getsize(OUT_PATH)} bytes")


if __name__ == "__main__":
    main()
