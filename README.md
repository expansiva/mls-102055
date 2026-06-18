# 102055 · collabMolecules — Glassmorphism (por herança)

Parte do **collab.codes**.

`102055` armazena moléculas no modelo visual **Glassmorphism**, migradas do projeto canônico **mls-102040**. Diferente do **mls-102054** (que recriou cada componente do zero, copiando a lógica), aqui cada molécula **herda** a classe do 102040 e reescreve **apenas a aparência**.

## Princípio

- A molécula glass `extends` a classe do 102040 (via `import` de `/_102040_/...`).
- Herda 100% da lógica: handlers, parsing, estado, eventos, ciclo de vida.
- Sobrescreve **somente o `render()`** com o template de vidro, e fornece um `.less` próprio.
- **Não** se altera o 102040 (projeto canônico intocável).

## Convenção de nomenclatura (tag derivada do arquivo)

No collab a tag é derivada do nome do arquivo + última pasta (`convertFileToTag` em `_102020_/l2/utils`) e o `@customElement(...)` precisa bater exatamente com ela. Por isso o sufixo `-glass` vai **no nome do arquivo**, e a pasta do grupo é a mesma do 102040:

| Arquivo | Pasta | Tag (`@customElement`) |
|---|---|---|
| `ml-toggle-switch-glass.ts` | `l2/molecules/groupenterboolean/` | `groupenterboolean--ml-toggle-switch-glass` |
| `ml-combobox-glass.ts` | `l2/molecules/groupselectone/` | `groupselectone--ml-combobox-glass` |
| `ml-date-picker-glass.ts` | `l2/molecules/groupenterdate/` | `groupenterdate--ml-date-picker-glass` |

Como a tag difere da do pai (`...ml-<nome>`), importar a classe **decorada** do 102040 não conflita no registro de `customElements`.

## Estrutura por molécula

- `ml-<nome>-glass.ts` — `extends` a classe do 102040 + `@customElement('<grupo>--ml-<nome>-glass')` + `render()` glass + `messages` próprio (o `messages` do 102040 é `const` local, não exportado).
- `ml-<nome>-glass.less` — aparência de vidro, escopada na tag completa. `enhancement="_102020_/l2/enhancementStyleAura"`.
- `ml-<nome>-glass.defs.ts` — metadados/skill (`TagName` = a tag completa; `enhancement="_blank"`).
- `ml-<nome>-glass.html` — playground isolado (contrato de container: fundo escuro/rico).
- `index.ts` / `index.html` por grupo — registra (side-effect import) e demonstra.

## Convenções técnicas

- **"Parede do `private`":** handlers/helpers do 102040 são `private` de TS (apagados em runtime, não `#`). O `render()` glass os referencia via um cast tipado de "internos" por molécula (`this as unknown as Internals`). Props de contrato (`@propertyDataSource`) são públicas e ficam tipadas normalmente.
- **Sem Shadow DOM:** CSS só no `.less` escopado sob a tag; `loadStyle` injeta em runtime (light DOM).
- **Contrato de container:** o vidro pressupõe fundo escuro/rico atrás (igual ao 102054). O `designSystem.ts`/tokens ainda não são consumidos pelas moléculas — o vidro está no `.less`.

Ver o plano completo em `todo/plano-102055.md` e o panorama dos projetos em `KB/projects_info.md`.
