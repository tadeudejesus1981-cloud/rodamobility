# RODA MOBILITY · Almería (Web App Prototype)

Protótipo demonstrativo de alta fidelidade desenvolvido para a locadora de motos e scooters **RODA MOBILITY** em Almería, Espanha.

O objetivo deste aplicativo é demonstrar ao vivo em reuniões comerciais a diferença prática de operação entre os 3 planos:
- **1. Plan STANDARD (Manual):** Operação tradicional via WhatsApp, minuta estática, contrato em papel na loja e controle manual de inventário.
- **2. Plan ADVANCE (Digital Autónomo - Foco de Venda ⭐):** Formulário digital completo, upload de documentos, assinatura digital com o dedo em tela sensível ao toque (`HTML5 Canvas`), bloqueio automático do calendário e emissão imediata de PDF.
- **3. Plan ENTERPRISE (Full IA + Supabase Edge Functions ⚡):** Zero digitação com escáner biométrico OCR por IA, feixe laser animado, validação automática de carnet DGT (>3 anos de carnet B para 125cc), assinatura digital e webhook em nuvem.
- **4. Panel del Dueño (Stock en Vivo 📊):** Gestão visual da frota das 3 motos com sincronização em tempo real e download de dossiê contratual com fotos dos documentos.

---

## 🎨 Identidade Visual (Fiel à Marca)
- **Tipografia:** Montserrat (Google Fonts)
- **Paleta de Cores Oficial:**
  - Verde Lima: `#C8F000` (CTAs, destaques, badges e laser IA)
  - Negro Carbón: `#111111` (Hero, Header e componentes premium)
  - Blanco Roto: `#F5F4EF` (Fundo e cards de veículos)
  - Gris: `#7C7C78` (Detalhamento fiscal e legendas)

---

## 🛵 Frota Realista
1. **Scooter 125cc PCX Honda** (Matrícula: `1024-KLM`) - 22€/día (Candy Lusty Red)
2. **Scooter 125cc PCX Honda** (Matrícula: `4892-MNP`) - 30€/día (Negro Carbón Mate con Baúl Shad)
3. **Moto 300cc / Gran Cilindrada** (Matrícula: `8831-LPB`) - 45€/día (Honda Forza 300 ABS)

---

## 🚀 Como Executar Localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build

# Pré-visualizar build de produção
npm run preview
```
