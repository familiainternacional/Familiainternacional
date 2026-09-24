"""Generate commercial web proposal PDF for JAF Abogados."""

from __future__ import annotations

import os

from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_JUSTIFY
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
OUT_PATH = os.path.abspath(os.path.join(OUT_DIR, "propuesta-web-jaf-abogados.pdf"))

BRAND = HexColor("#1a2744")
ACCENT = HexColor("#8b7355")
MUTED = HexColor("#4b5563")
LIGHT = HexColor("#f5f3ef")
LINE = HexColor("#d6d3d1")
DANGER = HexColor("#7f1d1d")


def styles():
    s = getSampleStyleSheet()
    s.add(ParagraphStyle("T", fontName="Helvetica-Bold", fontSize=22, leading=28, textColor=BRAND, spaceAfter=6))
    s.add(ParagraphStyle("ST", fontName="Helvetica", fontSize=11, leading=15, textColor=MUTED, spaceAfter=4))
    s.add(ParagraphStyle("H1", fontName="Helvetica-Bold", fontSize=13, leading=17, textColor=BRAND, spaceBefore=14, spaceAfter=6))
    s.add(ParagraphStyle("H2", fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=BRAND, spaceBefore=10, spaceAfter=4))
    s.add(ParagraphStyle("B", fontName="Helvetica", fontSize=9.5, leading=13, textColor=MUTED, alignment=TA_JUSTIFY, spaceAfter=5))
    s.add(ParagraphStyle("LI", fontName="Helvetica", fontSize=9.5, leading=12.5, textColor=MUTED, leftIndent=10, spaceAfter=2))
    s.add(ParagraphStyle("SM", fontName="Helvetica", fontSize=8, leading=10, textColor=MUTED))
    s.add(ParagraphStyle("TH", fontName="Helvetica-Bold", fontSize=8, leading=10, textColor=white))
    s.add(ParagraphStyle("TD", fontName="Helvetica", fontSize=8, leading=10, textColor=BRAND))
    return s


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BRAND)
    canvas.rect(0, A4[1] - 16, A4[0], 16, fill=1, stroke=0)
    canvas.setFillColor(white)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(1.8 * cm, A4[1] - 11, "Propuesta de desarrollo web — Estudio Juan Agustín Figueroa (JAF Abogados)")
    canvas.setFillColor(LINE)
    canvas.rect(0, 0, A4[0], 14, fill=1, stroke=0)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawCentredString(A4[0] / 2, 4, f"Pagina {doc.page} · Documento comercial confidencial")
    canvas.restoreState()


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    st = styles()
    doc = SimpleDocTemplate(
        OUT_PATH,
        pagesize=A4,
        leftMargin=1.8 * cm,
        rightMargin=1.8 * cm,
        topMargin=2 * cm,
        bottomMargin=1.6 * cm,
    )
    story = []

    story.append(Paragraph("Propuesta de desarrollo web", st["T"]))
    story.append(Paragraph("Estudio Juan Agustín Figueroa — JAF Abogados", st["ST"]))
    story.append(Paragraph("Sitio actual: www.jafabogados.cl · Preparado para reunión comercial", st["ST"]))
    story.append(Paragraph("Julio 2026", st["ST"]))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=2, color=ACCENT, spaceAfter=10))

    story.append(Paragraph("1. Por que esta propuesta (y no solo \"una pagina nueva\")", st["H1"]))
    story.append(
        Paragraph(
            "JAF Abogados no es un estudio generico: es una firma con mas de 100 anos de trayectoria "
            "(fundada en 1923), con sede en Las Condes y practica sofisticada en litigios, arbitrajes, "
            "civil-comercial, laboral, penal, tributario, corporativo, inmobiliario, consumidor y medio ambiente. "
            "Esa historia es un activo comercial enorme. Hoy, sin embargo, la presencia digital no refleja "
            "ese peso: el sitio cumple una funcion institucional basica, pero no convierte prestigio en "
            "consultas calificadas ni comunica autoridad moderna frente a clientes corporativos y ejecutivos "
            "que investigan abogados online antes de llamar.",
            st["B"],
        )
    )
    story.append(
        Paragraph(
            "La propuesta no es \"redisenar por estética\". Es construir un canal digital a la altura de la firma: "
            "credibilidad, claridad de materias, perfiles de socios y un camino simple para solicitar asesoria.",
            st["B"],
        )
    )

    story.append(Paragraph("2. Diagnostico del sitio actual (www.jafabogados.cl)", st["H1"]))
    story.append(Paragraph("<b>Fortalezas a preservar</b>", st["H2"]))
    for x in [
        "Marca historica y narrativa de tradicion (1923 / Estudio Figueroa).",
        "Amplitud real de areas de practica (ventaja competitiva frente a boutiques).",
        "Equipo de socios identificable (Figueroa, Bustillos, Cueto, etc.).",
        "Datos de contacto claros: Apoquindo 3669, telefono, correo, horario.",
        "Seccion de noticias / contenido propio (base para autoridad SEO).",
    ]:
        story.append(Paragraph(f"• {x}", st["LI"]))

    story.append(Paragraph("<b>Brechas que hoy restan conversion y prestigio</b>", st["H2"]))
    for x in [
        "Aspecto visual y UX de generacion anterior (sensacion \"WordPress generico\").",
        "Mensajes amplios (\"seremos parte de la solucion\") poco diferenciadores.",
        "Noticias desactualizadas (teletrabajo / COVID), que proyectan abandono editorial.",
        "Formulario de contacto con captcha aritmetico: friccion innecesaria y poca confianza.",
        "Sin recorrido claro de lead: evaluar caso / agendar / WhatsApp / urgencia.",
        "Paginas de areas extensas pero densas; poco foco en el problema del cliente.",
        "SEO y velocidad probablemente por debajo del estandar actual de firmas premium.",
        "Detalle de calidad (ej. tipografia \"Innmobiliario\") que erosiona la percepciOn de rigor.",
    ]:
        story.append(Paragraph(f"• {x}", st["LI"]))

    story.append(Paragraph("3. Objetivo de negocio del nuevo sitio", st["H1"]))
    for x in [
        "Transmitir autoridad institucional de una firma centenaria en lenguaje contemporaneo.",
        "Hacer que un visitante entienda en segundos: que hacemos, para quien y como contactarnos.",
        "Convertir trafico (organico, referidos, Ads) en leads calificados.",
        "Posicionar socios y areas clave en Google para busquedas de alto valor.",
        "Dar al estudio un activo digital propio, estable, rapido y facil de actualizar.",
    ]:
        story.append(Paragraph(f"• {x}", st["LI"]))

    story.append(Paragraph("4. Propuesta de solucion (alcance recomendado)", st["H1"]))
    story.append(
        Paragraph(
            "Sitio institucional premium, mobile-first, orientado a conversion, con arquitectura clara:",
            st["B"],
        )
    )
    for x in [
        "<b>Home de posicionamiento:</b> herencia + autoridad + areas + CTA de asesoria.",
        "<b>Historia / Estudio:</b> narrativa 1923–hoy (tradicion + modernidad, sin nostalgia vacia).",
        "<b>Areas de practica:</b> fichas claras por materia, problemas tipicos y llamado a accion.",
        "<b>Equipo / socios:</b> perfiles profesionales con foto, bio, correo y areas.",
        "<b>Casos / enfoque (opcional):</b> como enfrentan litigios complejos (sin confidencialidad).",
        "<b>Perspectivas / noticias:</b> blog moderno, reemplazando el muro de informativos COVID.",
        "<b>Contacto / evaluacion de caso:</b> formulario serio + mapa + WhatsApp / telefono.",
        "<b>SEO tecnico + analitica:</b> indexacion, metadatos, medicion de leads y origen.",
        "<b>Admin simple:</b> editar noticias, equipo y textos sin depender del desarrollador para todo.",
    ]:
        story.append(Paragraph(f"• {x}", st["LI"]))

    story.append(Paragraph("5. Paquetes comerciales (para vender por etapas)", st["H1"]))
    rows = [
        [
            Paragraph("<b>Paquete</b>", st["TH"]),
            Paragraph("<b>Incluye</b>", st["TH"]),
            Paragraph("<b>Ideal si...</b>", st["TH"]),
        ],
        [
            Paragraph("<b>Esencial</b><br/>Presencia premium", st["TD"]),
            Paragraph(
                "Home, Historia, Areas (resumen), Equipo, Contacto, responsive, SEO base, migracion de contenidos clave.",
                st["TD"],
            ),
            Paragraph("Necesitan renovar imagen y contacto profesional cuanto antes.", st["TD"]),
        ],
        [
            Paragraph("<b>Profesional</b><br/>Recomendado", st["TD"]),
            Paragraph(
                "Todo lo Esencial + paginas profundas por area + blog/noticias + formulario de leads + analitica + optimizacion de conversion.",
                st["TD"],
            ),
            Paragraph("Quieren que el sitio genere consultas de calidad, no solo \"informar\".", st["TD"]),
        ],
        [
            Paragraph("<b>Premium</b><br/>Firma digital completa", st["TD"]),
            Paragraph(
                "Todo lo Profesional + landings por materia para Ads + CMS/admin + integraciones (CRM/email) + plan de contenidos 90 dias.",
                st["TD"],
            ),
            Paragraph("Quieren captacion activa y un sistema digital alineado a crecimiento comercial.", st["TD"]),
        ],
    ]
    t = Table(rows, colWidths=[3.8 * cm, 8.2 * cm, 5.2 * cm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BRAND),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, LIGHT]),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(t)
    story.append(Spacer(1, 6))
    story.append(
        Paragraph(
            "La inversion se cotiza a medida segun paquete, volumen de contenidos a migrar y plazos. "
            "En la reunion comercial se entrega monto en UF/CLP, cronograma y condiciones.",
            st["SM"],
        )
    )

    story.append(Paragraph("6. Fases de trabajo (como se entrega)", st["H1"]))
    for x in [
        "<b>Fase 1 — Discovery (1 semana):</b> reunion con socios, prioridades comerciales, tonos de marca, areas a destacar.",
        "<b>Fase 2 — Arquitectura y diseno (2–3 semanas):</b> mapa del sitio, wireframes, look & feel institucional.",
        "<b>Fase 3 — Desarrollo (3–5 semanas):</b> implementacion, formularios, SEO, responsivo, revisiones.",
        "<b>Fase 4 — Contenidos y QA (1–2 semanas):</b> migracion, correccion editorial, pruebas, capacitacion.",
        "<b>Fase 5 — Lanzamiento:</b> DNS, dominio jafabogados.cl, analitica, garantia post-lanzamiento.",
    ]:
        story.append(Paragraph(f"• {x}", st["LI"]))

    story.append(Paragraph("7. Argumentario de venta (como presentarlo al cliente)", st["H1"]))
    story.append(Paragraph("<b>Apertura</b>", st["H2"]))
    story.append(
        Paragraph(
            "\"Hoy su estudio tiene un activo que pocos pueden reclamar: mas de un siglo de trayectoria. "
            "La web actual no esta capitalizando ese activo frente a clientes que deciden online.\"",
            st["B"],
        )
    )
    story.append(Paragraph("<b>Problema</b>", st["H2"]))
    story.append(
        Paragraph(
            "\"Un ejecutivo o directorio que busca litigio complejo en Santiago compara firmas en minutos. "
            "Si el sitio se ve desactualizado o no deja claro con quien hablar, pierden la oportunidad "
            "aunque sean la mejor opcion juridica.\"",
            st["B"],
        )
    )
    story.append(Paragraph("<b>Solucion</b>", st["H2"]))
    story.append(
        Paragraph(
            "\"Les proponemos un sitio que proyecte la seriedad de JAF, ordene las areas de practica "
            "y convierta visitas en conversaciones reales con el equipo.\"",
            st["B"],
        )
    )
    story.append(Paragraph("<b>Prueba / diferenciador</b>", st["H2"]))
    story.append(
        Paragraph(
            "\"No vendemos plantillas. Disenamos la estructura digital como canal comercial del estudio: "
            "historia, equipo, materias y captacion, medible.\"",
            st["B"],
        )
    )
    story.append(Paragraph("<b>Cierre</b>", st["H2"]))
    story.append(
        Paragraph(
            "\"Partamos por el paquete Profesional: renovacion completa + leads. Si mas adelante quieren "
            "campanas, sumamos landings Premium. ¿Agendamos discovery de 45 minutos con socios?\"",
            st["B"],
        )
    )

    story.append(Paragraph("8. Riesgos de no hacerlo (urgencia suave)", st["H1"]))
    for x in [
        "Competidores mas nuevos se ven \"mas serios\" online aunque tengan menos historia.",
        "Contenido antiguo debilita confianza y SEO.",
        "Cada mes sin formulario/lead medible es demanda potencial perdida.",
        "La marca centenaria se percibe como legado, no como firma vigente del siglo XXI.",
    ]:
        story.append(Paragraph(f"• {x}", st["LI"]))

    story.append(Paragraph("9. Proximos pasos sugeridos", st["H1"]))
    for x in [
        "Enviar este documento como prelectura antes de la reunion.",
        "Reunion de discovery con 1–2 socios (objetivos, areas prioritarias, tono).",
        "Entregar cotizacion formal del paquete elegido + cronograma.",
        "Kickoff con acceso a contenidos, fotos y cuentas (dominio/hosting).",
    ]:
        story.append(Paragraph(f"• {x}", st["LI"]))

    story.append(Spacer(1, 12))
    story.append(HRFlowable(width="100%", thickness=1, color=LINE, spaceAfter=6))
    story.append(
        Paragraph(
            "Documento preparado para apoyo comercial. Adaptar montos, plazos y alcance segun negociacion. "
            "Referencia del sitio auditado: https://www.jafabogados.cl/",
            st["SM"],
        )
    )

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(OUT_PATH)
    print(f"OK {os.path.getsize(OUT_PATH)} bytes")


if __name__ == "__main__":
    main()
