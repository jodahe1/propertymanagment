import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { format } from 'sql-formatter';

export class CustomMigrationGenerator extends TSMigrationGenerator {

  generateMigrationFile(className: string, diff: { up: string[]; down: string[] }): string {
    const comment = '// this file was generated via custom migration generator\n\n';
    
    // Generate CommonJS format instead of ES modules
    let ret = comment;
    ret += `const { Migration } = require('@mikro-orm/migrations');\n\n`;
    ret += `class ${className} extends Migration {\n\n`;
    ret += `  async up() {\n`;
    diff.up.forEach(sql => ret += this.createStatement(sql, 4));
    ret += `  }\n\n`;
    ret += `  async down() {\n`;
    diff.down.forEach(sql => ret += this.createStatement(sql, 4));
    ret += `  }\n\n`;
    ret += `}\n\n`;
    ret += `module.exports = { ${className} };\n`;

    return ret;
  }

  createStatement(sql: string, padLeft: number): string {
    // Format the SQL for better readability
    sql = format(sql, { language: 'postgresql' });
    // Handle multi-line SQL with proper indentation
    sql = sql.split('\n').map((l, i) => i === 0 ? l : `${' '.repeat(padLeft + 13)}${l}`).join('\n');

    return `${' '.repeat(padLeft)}this.addSql(\`${sql}\`);\n`;
  }

}