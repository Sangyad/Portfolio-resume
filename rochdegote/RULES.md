# RULES.md

**Stack:** React + Vite + None / frontend only
**Platform:** web

> This file is a **lazy index** — `concern → playbook §`.
> Read only the § you need. Never load all playbooks eagerly.
> Detail lives in `playbooks/`. Concern files live in `playbooks/concerns/`.

---

## Always-on Invariants

| Concern | Playbook | Section |
|---------|----------|---------|
| `accessibility` | `playbooks/universal/accessibility.md` | Semantic Structure |
| `accessibility` | `playbooks/universal/accessibility.md` | Keyboard and Focus |
| `accessibility` | `playbooks/universal/accessibility.md` | Forms and Authentication |
| `accessibility` | `playbooks/universal/accessibility.md` | Accessibility Testing |
| `naming` | `playbooks/universal/coding-rules/naming.md` | Naming |
| `naming` | `playbooks/universal/coding-rules/naming.md` | Functions |
| `naming` | `playbooks/universal/coding-rules/naming.md` | Imports |
| `naming` | `playbooks/universal/coding-rules/naming.md` | Constants |
| `no-debug` | `playbooks/universal/coding-rules/hygiene.md` | No Debug Code in Commits |
| `no-debug` | `playbooks/universal/coding-rules/hygiene.md` | One Thing Per File |
| `errors` | `playbooks/universal/error-handling.md` | Error Contract |
| `errors` | `playbooks/universal/error-handling.md` | Boundary Handling |
| `errors` | `playbooks/universal/error-handling.md` | Security Rules for Errors |
| `git-branches` | `playbooks/universal/git-conventions/branches.md` | Branch Structure |
| `git-commits` | `playbooks/universal/git-conventions/commits.md` | Commit Convention |
| `git-workflow` | `playbooks/universal/git-conventions/workflow.md` | Daily Workflow |
| `observability` | `playbooks/universal/observability.md` | Structured Events |
| `observability` | `playbooks/universal/observability.md` | Health and Readiness |
| `observability` | `playbooks/universal/observability.md` | Errors and Traces |
| `security-boundaries` | `playbooks/universal/security.md` | Trust Boundaries |
| `security-boundaries` | `playbooks/universal/security.md` | Authentication and Authorization |
| `secret-safety` | `playbooks/universal/security.md` | Secrets and Data |
| `secret-safety` | `playbooks/universal/security.md` | Failure Safety |
| `typescript-strict` | `playbooks/universal/typescript/boundaries.md` | Strict Mode — Always On |
| `typescript-strict` | `playbooks/universal/typescript/boundaries.md` | No any |
| `typescript-strict` | `playbooks/universal/typescript/boundaries.md` | Type vs Interface |
| `web-platform` | `playbooks/platform/web.md` | Browser Boundary |
| `web-platform` | `playbooks/platform/web.md` | Navigation and Accessibility |
| `architecture` | `playbooks/stack/react-vite/architecture.md` | Profiles |
| `architecture` | `playbooks/stack/react-vite/architecture.md` | Dependency Direction |
| `structure` | `playbooks/stack/react-vite/structure.md` | Canonical Reference Tree |
| `structure` | `playbooks/stack/react-vite/structure.md` | Profile Differences |
| `structure` | `playbooks/stack/react-vite/structure.md` | File Placement |
| `structure` | `playbooks/stack/react-vite/structure.md` | Architecture Cleanup |
| `runtime` | `playbooks/stack/react-vite/runtime.md` | Remote State |
| `stack-security` | `playbooks/stack/react-vite/security.md` | Browser Trust Boundary |
| `stack-testing` | `playbooks/stack/react-vite/testing.md` | Test Layers |
| `styling-ownership` | `playbooks/styling/ownership.md` | Component Ownership |
| `styling-ownership` | `playbooks/styling/ownership.md` | Dependency Direction |
| `styling-mode` | `playbooks/styling/css-modules/architecture.md` | Primary Mode |
| `styling-mode` | `playbooks/styling/css-modules/architecture.md` | File Structure |
| `styling-mode` | `playbooks/styling/css-modules/architecture.md` | Browser Inspection |
| `styling-tokens` | `playbooks/styling/css-modules/tokens.md` | Global Foundation |
| `styling-tokens` | `playbooks/styling/css-modules/tokens.md` | Theme Boundary |
| `styling-components` | `playbooks/styling/css-modules/components.md` | Component Ownership |
| `styling-components` | `playbooks/styling/css-modules/components.md` | Common Button |
| `styling-responsive` | `playbooks/styling/css-modules/responsive.md` | Responsive in Module File |
| `ci` | `playbooks/capabilities/ci/github-actions.md` | Frontend CI |
| `ci` | `playbooks/capabilities/ci/github-actions.md` | Backend CI (Spring Boot) |
| `ci` | `playbooks/capabilities/ci/github-actions.md` | Next.js CI |
| `pr` | `playbooks/devops/pr-template.md` | Template |

---

## Conditional Workflows

| Concern | Playbook | Section | When |
|---------|----------|---------|------|
| `product-onboarding` | `playbooks/universal/product-planning.md` | Product Onboarding | CONTEXT.md reports Product status as incomplete |
| `product-onboarding` | `playbooks/universal/product-planning.md` | Starter Transition | CONTEXT.md reports Product status as incomplete |
| `plan-reconciliation` | `playbooks/universal/product-planning.md` | Plan Reconciliation | The user supplies or substantially changes a specification or plan |

---

## Optional Concerns

| Concern | Playbook | Section | When |
|---------|----------|---------|------|
| `validation` | `playbooks/universal/typescript/patterns.md` | Zod for Runtime Validation | Project validates external/runtime input |
| `http-client` | `playbooks/concerns/axios.md` | § 1 One Shared Client | The app adopts Axios instead of the native fetch client |
| `http-client` | `playbooks/concerns/axios.md` | § 3 Service Calls apiClient, Hook Calls Service | The app adopts Axios instead of the native fetch client |
| `query` | `playbooks/concerns/tanstack-query.md` | § 3 Read Hook | Client needs cached server state |
| `query` | `playbooks/concerns/tanstack-query.md` | § 4 Mutation Hook | Client needs cached server state |
| `state` | `playbooks/concerns/zustand.md` | § 2 Store Setup | Shared UI state across pages |

---

**How to use this file:**
1. Identify which concern your task touches.
2. Open only the listed playbook at the listed §.
3. Stop reading when the § ends.
4. Never read all playbooks eagerly — your context window is finite.

