#!/bin/bash
cat src/components/layout/Header.tsx | sed 's/import { Button } from "@\/src\/components\/ui\/button"/import { Button } from "@\/src\/components\/ui\/button"\nimport { Globe } from "lucide-react"\nimport { useLanguage } from "..\/..\/contexts\/LanguageContext"\nimport { t } from "..\/..\/i18n\/translations"/' > temp.tsx

# Wait, sed might be messy for big replacements. Let's write a node script or use edit_file.
