#!/usr/bin/env node

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Estrutura completa de pastas do OrdoHub
const folderStructure = {
  'src/app': [
    'providers',
    'router',
    'store',
    'layout',
    'hooks',
    'types'
  ],
  'src/pages': [
    'home',
    'auth',
    'auth/login',
    'auth/register',
    'auth/forgot-password',
    'dashboard',
    'tasks',
    'tasks/create',
    'tasks/edit',
    'tasks/list',
    'calendar',
    'finances',
    'finances/expenses',
    'finances/budget',
    'finances/reports',
    'inventory',
    'inventory/items',
    'inventory/categories',
    'family',
    'family/members',
    'family/roles',
    'settings',
    'settings/profile',
    'settings/notifications',
    'settings/preferences',
    'help',
    'not-found'
  ],
  'src/modules': [
    'auth',
    'auth/components',
    'auth/hooks',
    'auth/services',
    'auth/types',
    'auth/utils',
    'tasks',
    'tasks/components',
    'tasks/hooks',
    'tasks/services',
    'tasks/types',
    'tasks/utils',
    'calendar',
    'calendar/components',
    'calendar/hooks',
    'calendar/services',
    'calendar/types',
    'calendar/utils',
    'finances',
    'finances/components',
    'finances/hooks',
    'finances/services',
    'finances/types',
    'finances/utils',
    'inventory',
    'inventory/components',
    'inventory/hooks',
    'inventory/services',
    'inventory/types',
    'inventory/utils',
    'family',
    'family/components',
    'family/hooks',
    'family/services',
    'family/types',
    'family/utils',
    'notifications',
    'notifications/components',
    'notifications/hooks',
    'notifications/services',
    'notifications/types',
    'notifications/utils'
  ],
  'src/entities': [
    'user',
    'user/model',
    'user/api',
    'user/types',
    'task',
    'task/model',
    'task/api',
    'task/types',
    'family',
    'family/model',
    'family/api',
    'family/types',
    'expense',
    'expense/model',
    'expense/api',
    'expense/types',
    'budget',
    'budget/model',
    'budget/api',
    'budget/types',
    'inventory-item',
    'inventory-item/model',
    'inventory-item/api',
    'inventory-item/types',
    'notification',
    'notification/model',
    'notification/api',
    'notification/types',
    'calendar-event',
    'calendar-event/model',
    'calendar-event/api',
    'calendar-event/types'
  ],
  'src/shared': [
    'ui',
    'ui/components',
    'ui/components/forms',
    'ui/components/layout',
    'ui/components/navigation',
    'ui/components/feedback',
    'ui/components/data-display',
    'ui/components/overlays',
    'ui/components/inputs',
    'ui/components/buttons',
    'ui/icons',
    'ui/styles',
    'ui/themes',
    'hooks',
    'hooks/api',
    'hooks/ui',
    'hooks/form',
    'hooks/auth',
    'utils',
    'utils/date',
    'utils/format',
    'utils/validation',
    'utils/storage',
    'utils/api',
    'utils/constants',
    'constants',
    'constants/routes',
    'constants/api',
    'constants/ui',
    'constants/permissions',
    'types',
    'types/api',
    'types/ui',
    'types/entities',
    'types/common',
    'lib',
    'lib/api',
    'lib/storage',
    'lib/validation',
    'lib/date',
    'lib/auth',
    'config',
    'config/api',
    'config/app',
    'config/theme'
  ],
  'src/infrastructure': [
    'api',
    'api/client',
    'api/endpoints',
    'api/interceptors',
    'api/types',
    'storage',
    'storage/local',
    'storage/session',
    'storage/secure',
    'auth',
    'auth/providers',
    'auth/guards',
    'auth/utils',
    'websocket',
    'websocket/client',
    'websocket/events',
    'websocket/handlers',
    'monitoring',
    'monitoring/analytics',
    'monitoring/errors',
    'monitoring/performance',
    'database',
    'database/models',
    'database/migrations',
    'database/seeders',
    'cache',
    'cache/providers',
    'cache/strategies'
  ]
};

// Função para criar diretório e arquivo index.ts
function createFolderWithIndex(folderPath) {
  const fullPath = join(projectRoot, folderPath);
  
  // Criar diretório se não existir
  if (!existsSync(fullPath)) {
    mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Criado: ${folderPath}`);
  } else {
    console.log(`⚠️  Já existe: ${folderPath}`);
  }
  
  // Criar arquivo index.ts se não existir
  const indexPath = join(fullPath, 'index.ts');
  if (!existsSync(indexPath)) {
    writeFileSync(indexPath, '// Export all from this module\n');
    console.log(`✅ Criado: ${folderPath}/index.ts`);
  } else {
    console.log(`⚠️  Já existe: ${folderPath}/index.ts`);
  }
}

// Função principal
function setupFolders() {
  console.log('🚀 Iniciando criação da estrutura de pastas do OrdoHub...\n');
  
  // Criar estrutura base
  Object.keys(folderStructure).forEach(baseFolder => {
    // Criar pasta base
    createFolderWithIndex(baseFolder);
    
    // Criar subpastas
    folderStructure[baseFolder].forEach(subFolder => {
      const fullSubPath = join(baseFolder, subFolder);
      createFolderWithIndex(fullSubPath);
    });
    
    console.log(''); // Linha em branco para separar seções
  });
  
  // Criar algumas pastas adicionais úteis
  const additionalFolders = [
    'public/images',
    'public/icons',
    'public/assets',
    'docs',
    'docs/api',
    'docs/components',
    'docs/architecture'
  ];
  
  console.log('📁 Criando pastas adicionais...\n');
  additionalFolders.forEach(folder => {
    const fullPath = join(projectRoot, folder);
    if (!existsSync(fullPath)) {
      mkdirSync(fullPath, { recursive: true });
      console.log(`✅ Criado: ${folder}`);
    } else {
      console.log(`⚠️  Já existe: ${folder}`);
    }
  });
  
  console.log('\n🎉 Estrutura de pastas criada com sucesso!');
  console.log('\n📋 Resumo da estrutura criada:');
  console.log('├── src/app          - Configuração da aplicação');
  console.log('├── src/pages        - Páginas da aplicação');
  console.log('├── src/modules      - Módulos funcionais');
  console.log('├── src/entities     - Entidades de negócio');
  console.log('├── src/shared       - Código compartilhado');
  console.log('├── src/infrastructure - Infraestrutura e integrações');
  console.log('├── public           - Arquivos públicos');
  console.log('└── docs             - Documentação');
  console.log('\n💡 Todos os diretórios contêm arquivos index.ts para facilitar exports');
}

// Executar o script
setupFolders();
