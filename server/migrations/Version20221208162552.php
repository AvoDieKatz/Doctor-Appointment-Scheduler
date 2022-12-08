<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221208162552 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE appointment ADD patient_department_id INT NOT NULL, DROP patient_department');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F8446F07BB2B FOREIGN KEY (patient_department_id) REFERENCES department (id)');
        $this->addSql('CREATE INDEX IDX_FE38F8446F07BB2B ON appointment (patient_department_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F8446F07BB2B');
        $this->addSql('DROP INDEX IDX_FE38F8446F07BB2B ON appointment');
        $this->addSql('ALTER TABLE appointment ADD patient_department VARCHAR(255) NOT NULL, DROP patient_department_id');
    }
}
