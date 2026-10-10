# Development Environments

## Default local workflow

Run the generator directly on the host, then use the commands in `setup.md`. Docker is optional and is never required to run create-win-project itself. Local files and package-manager metadata remain the source of truth.

## Adding Docker later

Docker files were not selected. Re-run the generator for a fresh project with Docker enabled if you want isolated backend runtimes and databases; the normal host workflow remains fully supported.

## Dev Containers

A generic Dev Container is intentionally not generated: JavaScript, Java, PHP, and mobile stacks need different host/device boundaries. VS Code and Codespaces users can open the generated repository normally and add a stack-specific Dev Container later without changing the supported local or Compose workflows.
