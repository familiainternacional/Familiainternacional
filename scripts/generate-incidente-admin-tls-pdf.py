"""Generate PDF for admin TLS incident report."""

from __future__ import annotations

import os

from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    Paragraph,
    Preformatted,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "docs")
OUT_PATH = os.path.abspath(os.path.join(OUT_DIR, "INFORME-INCIDENTE-ADMIN-TLS.pdf"))

BRAND = HexColor("#07234c")
ACCENT = HexColor("#b38b59")
MUTED = HexColor("#475569")
LIGHT = HexColor("#f7f7f3")
LINE = HexColor("#d1d5db")
CODE_BG = HexColor("#0f172a")
CODE_FG = HexColor("#e2e8f0")
QUOTE_BG = HexColor("#eef2f7")


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="CoverTitle",
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=28,
            textColor=BRAND,
            spaceAfter=10,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Meta",
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            textColor=MUTED,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H1",
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=17,
            textColor=BRAND,
            spaceBefore=14,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H2",
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            textColor=BRAND,
            spaceBefore=10,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            textColor=HexColor("#1e293b"),
            alignment=TA_JUSTIFY,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyBullet",
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            textColor=HexColor("#1e293b"),
            leftIndent=8,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Quote",
            fontName="Helvetica-Oblique",
            fontSize=10,
            leading=14,
            textColor=BRAND,
            leftIndent=10,
            rightIndent=10,
            spaceBefore=6,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="FooterNote",
            fontName="Helvetica",
            fontSize=8,
            leading=11,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceBefore=16,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableCell",
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=HexColor("#1e293b"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableHead",
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=11,
            textColor=white,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CodeBlock",
            fontName="Courier",
            fontSize=8,
            leading=11,
            textColor=CODE_FG,
            backColor=CODE_BG,
            leftIndent=6,
            rightIndent=6,
            spaceBefore=4,
            spaceAfter=8,
        )
    )
    return styles


def section_rule():
    return HRFlowable(width="100%", thickness=0.6, color=LINE, spaceBefore=2, spaceAfter=6)


def build_pdf():
    os.makedirs(OUT_DIR, exist_ok=True)
    doc = SimpleDocTemplate(
        OUT_PATH,
        pagesize=A4,
        leftMargin=1.8 * cm,
        rightMargin=1.8 * cm,
        topMargin=1.6 * cm,
        bottomMargin=1.6 * cm,
        title="Informe técnico: caída del panel admin",
        author="Familia Internacional",
    )
    styles = build_styles()
    story = []

    story.append(Paragraph("Informe técnico: caída del panel admin", styles["CoverTitle"]))
    story.append(section_rule())
    story.append(Paragraph("<b>Proyecto:</b> Familia Internacional", styles["Meta"]))
    story.append(Paragraph("<b>Fecha:</b> 24 de septiembre de 2026", styles["Meta"]))
    story.append(Paragraph("<b>Alcance:</b> Acceso al panel /admin en producción", styles["Meta"]))
    story.append(Paragraph("<b>Estado:</b> Mitigado (fix desplegado en main)", styles["Meta"]))
    story.append(Spacer(1, 8))

    story.append(Paragraph("1. Resumen ejecutivo", styles["H1"]))
    story.append(
        Paragraph(
            "El panel de administración mostraba el error «No se pudo cargar el dashboard» "
            "pese a que la sesión admin seguía activa. La causa <b>no</b> fue el cambio de "
            "layout de tracking (GTM/GA), sino una modificación de la configuración SSL de "
            "Prisma hacia Supabase <b>sin</b> el certificado CA correspondiente.",
            styles["Body"],
        )
    )

    story.append(Paragraph("2. Síntoma observado", styles["H1"]))
    for item in [
        "<b>UI:</b> «No se pudo cargar el dashboard»",
        "<b>Mensaje de apoyo:</b> la sesión admin estaba activa, pero el panel no lograba consultar la base de datos",
        "<b>Detalle técnico:</b>",
    ]:
        story.append(Paragraph(f"• {item}", styles["BodyBullet"]))

    story.append(
        Preformatted(
            "Invalid prisma.lead.count() / prisma.lead.findMany() invocation:\n"
            "Error opening a TLS connection: self-signed certificate in certificate chain",
            styles["CodeBlock"],
        )
    )
    story.append(
        Paragraph(
            "Interpretación: autenticación/sesión OK; fallo en la capa de conexión TLS "
            "entre la app (Vercel) y PostgreSQL (Supabase pooler).",
            styles["Body"],
        )
    )

    story.append(Paragraph("3. Qué se cambió en layout (campañas / tracking)", styles["H1"]))
    story.append(
        Paragraph(
            "En <b>src/app/layout.tsx</b> se intervinieron componentes de medición:",
            styles["Body"],
        )
    )
    for item in [
        "Inclusión / ajuste de <b>Google Tag Manager</b> (GTM-PXTTJKZ)",
        "Uso de <b>Google Analytics</b> (G-GSG9KGPXX3)",
        "Cambios de formato y, en algún momento, duplicación temporal de Analytics",
    ]:
        story.append(Paragraph(f"• {item}", styles["BodyBullet"]))
    story.append(Spacer(1, 4))
    story.append(
        Paragraph(
            "<b>Impacto:</b> tracking y medición de campañas. "
            "<b>No explican</b> el error de TLS ni la imposibilidad de consultar leads en el admin.",
            styles["Body"],
        )
    )

    story.append(Paragraph("4. Causa raíz real", styles["H1"]))
    story.append(
        Paragraph(
            "En <b>src/lib/db/prisma.ts</b> se modificó la opción SSL del cliente pg / Prisma:",
            styles["Body"],
        )
    )

    table_data = [
        [
            Paragraph("Antes (operativo)", styles["TableHead"]),
            Paragraph("Después (roto)", styles["TableHead"]),
        ],
        [
            Paragraph("ssl: { rejectUnauthorized: false }", styles["TableCell"]),
            Paragraph("ssl: { rejectUnauthorized: true }", styles["TableCell"]),
        ],
    ]
    table = Table(table_data, colWidths=[8.2 * cm, 8.2 * cm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BRAND),
                ("BACKGROUND", (0, 1), (-1, 1), LIGHT),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, LINE),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    story.append(table)
    story.append(Spacer(1, 8))
    story.append(
        Paragraph(
            "Con <b>rejectUnauthorized: true</b>, Node exige validar la cadena de certificados "
            "del pooler de Supabase. Sin el <b>Supabase Root CA 2021</b> (prod-ca-2021.crt), "
            "la validación falla con <i>self-signed certificate in certificate chain</i> y "
            "cualquier consulta Prisma del admin queda bloqueada.",
            styles["Body"],
        )
    )
    story.append(
        Paragraph(
            "<b>Commit relevante (ejemplo):</b> 321ee28 — Update prisma.ts "
            "(cuenta familiainternacional / jaimesotosilva@gmail.com).",
            styles["Body"],
        )
    )

    story.append(Paragraph("Frase clave", styles["H2"]))
    quote_table = Table(
        [
            [
                Paragraph(
                    "«No fue el layout de ads; fue un cambio de SSL en Prisma sin el CA de "
                    "Supabase. El layout solo tocaba tracking (GTM/GA).»",
                    styles["Quote"],
                )
            ]
        ],
        colWidths=[16.4 * cm],
    )
    quote_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), QUOTE_BG),
                ("BOX", (0, 0), (-1, -1), 0.5, BRAND),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(quote_table)

    story.append(Paragraph("5. Resolución aplicada", styles["H1"]))
    for item in [
        "Incorporar el certificado <b>Supabase Root CA 2021</b> al repositorio y embeberlo en código para el bundle de Vercel.",
        "Configurar Prisma/pg con TLS cifrado <b>y</b> verificación usando ese CA.",
        "Eliminar flags conflictivos de DATABASE_URL (sslmode, sslaccept, etc.).",
        "Corregir typecheck: ConnectionOptions se importa desde <b>tls</b> (Node), no desde pg.",
    ]:
        story.append(Paragraph(f"• {item}", styles["BodyBullet"]))

    story.append(Paragraph("Commits de remediación (selección)", styles["H2"]))
    rem_data = [
        [
            Paragraph("Commit", styles["TableHead"]),
            Paragraph("Descripción", styles["TableHead"]),
        ],
        [
            Paragraph("8de324d", styles["TableCell"]),
            Paragraph("Restaurar TLS compatible con Supabase (ajuste inicial)", styles["TableCell"]),
        ],
        [
            Paragraph("c5ec097", styles["TableCell"]),
            Paragraph("Confiar en Supabase Root CA 2021 para Prisma TLS", styles["TableCell"]),
        ],
        [
            Paragraph("a44ddc3", styles["TableCell"]),
            Paragraph("Importar ConnectionOptions desde tls (build TypeScript)", styles["TableCell"]),
        ],
    ]
    rem_table = Table(rem_data, colWidths=[3.2 * cm, 13.2 * cm])
    rem_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BRAND),
                ("BACKGROUND", (0, 1), (-1, -1), LIGHT),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(rem_table)

    story.append(Paragraph("6. Conclusiones", styles["H1"]))
    for item in [
        "El fallo del admin fue de <b>conectividad TLS a la base de datos</b>, no de sesión ni de layout de marketing.",
        "Los cambios de <b>GTM/GA en layout</b> son independientes del incidente de base de datos.",
        "Activar verificación SSL estricta en producción <b>requiere</b> el CA de Supabase.",
        "Conviene separar responsabilidades: tracking de campañas no debería modificar prisma.ts ni variables críticas de BD sin revisión.",
    ]:
        story.append(Paragraph(f"• {item}", styles["BodyBullet"]))

    story.append(Paragraph("7. Recomendaciones", styles["H1"]))
    for item in [
        "Proteger <b>src/lib/db/prisma.ts</b> y variables DATABASE_* (revisión obligatoria / CODEOWNERS).",
        "Documentar en el runbook: si se usa rejectUnauthorized: true, debe estar presente el CA de Supabase.",
        "No mezclar cambios de ads/tracking con cambios de infraestructura en el mismo PR sin revisión técnica.",
        "Tras deploys de infra, validar smoke test: login admin + listado de leads.",
    ]:
        story.append(Paragraph(f"• {item}", styles["BodyBullet"]))

    story.append(Paragraph("8. Estado final", styles["H1"]))
    for item in [
        "Causa identificada y documentada",
        "Fix en main con CA de Supabase",
        "Tracking (GTM/GA) puede permanecer; no fue la causa del incidente",
    ]:
        story.append(Paragraph(f"• {item}", styles["BodyBullet"]))

    story.append(
        Paragraph(
            "Informe generado a partir del diagnóstico técnico del incidente de producción del panel admin.",
            styles["FooterNote"],
        )
    )

    doc.build(story)
    print(f"PDF generado: {OUT_PATH}")


if __name__ == "__main__":
    build_pdf()
