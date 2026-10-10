# Certificate images

All images are referenced by filename from
`src/features/resume/data/certificates.ts`.

## Earned — real files

| File                                      | Credential                                                            |
| ----------------------------------------- | --------------------------------------------------------------------- |
| `cisco-cybersecurity-defense-analyst.jpg` | Cybersecurity Defense Analyst Pathway Exam (Cisco Networking Academy) |
| `certificate-participation.jpg`           | Certificate of Participation — Assumption College of Toledo BSIT      |

## In progress — generated placeholders

These render a dark "IN PROGRESS" card so nothing looks earned. Replace the file
and set `status: 'earned'` in the data file to upgrade one to a real credential.

| File                                             | Credential                                 |
| ------------------------------------------------ | ------------------------------------------ |
| `aws-solutions-architect.jpg`                    | AWS Solutions Architect — Associate        |
| `certified-kubernetes-administrator.jpg`         | Certified Kubernetes Administrator         |
| `aws-certified-developer.jpg`                    | AWS Certified Developer — Associate        |
| `certified-kubernetes-application-developer.jpg` | Certified Kubernetes Application Developer |
| `terraform-associate.jpg`                        | HashiCorp Certified: Terraform Associate   |
| `pmp.jpg`                                        | Project Management Professional (PMP)      |

## Profile photo

Drop a photo at `public/profile.jpg` (square, ~400×400 or larger). Until then
the Hero shows a monogram placeholder — no broken image.

Cards use `object-fit: cover` at a 16:10 ratio, so wide images look best.
Keep files under ~200 KB; `magick in.png -resize 1200x -quality 82 -strip out.jpg`
is the command used for the originals.
