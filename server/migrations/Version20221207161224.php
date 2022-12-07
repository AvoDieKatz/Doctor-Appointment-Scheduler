<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221207161224 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F84432B07E31');
        $this->addSql('DROP INDEX IDX_FE38F84432B07E31 ON appointment');
        $this->addSql('ALTER TABLE appointment CHANGE doctor_id_id doctor_id INT NOT NULL');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F84487F4FB17 FOREIGN KEY (doctor_id) REFERENCES doctor (id)');
        $this->addSql('CREATE INDEX IDX_FE38F84487F4FB17 ON appointment (doctor_id)');
        $this->addSql('ALTER TABLE doctor DROP FOREIGN KEY FK_1FC0F36A64E7214B');
        $this->addSql('ALTER TABLE doctor DROP FOREIGN KEY FK_1FC0F36A9D86650F');
        $this->addSql('DROP INDEX UNIQ_1FC0F36A9D86650F ON doctor');
        $this->addSql('DROP INDEX IDX_1FC0F36A64E7214B ON doctor');
        $this->addSql('ALTER TABLE doctor ADD user_id INT NOT NULL, ADD department_id INT NOT NULL, DROP user_id_id, DROP department_id_id');
        $this->addSql('ALTER TABLE doctor ADD CONSTRAINT FK_1FC0F36AA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE doctor ADD CONSTRAINT FK_1FC0F36AAE80F5DF FOREIGN KEY (department_id) REFERENCES department (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1FC0F36AA76ED395 ON doctor (user_id)');
        $this->addSql('CREATE INDEX IDX_1FC0F36AAE80F5DF ON doctor (department_id)');
        $this->addSql('ALTER TABLE report DROP FOREIGN KEY FK_C42F77849334AFB9');
        $this->addSql('DROP INDEX UNIQ_C42F77849334AFB9 ON report');
        $this->addSql('ALTER TABLE report CHANGE appointment_id_id appointment_id INT NOT NULL');
        $this->addSql('ALTER TABLE report ADD CONSTRAINT FK_C42F7784E5B533F9 FOREIGN KEY (appointment_id) REFERENCES appointment (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C42F7784E5B533F9 ON report (appointment_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F84487F4FB17');
        $this->addSql('DROP INDEX IDX_FE38F84487F4FB17 ON appointment');
        $this->addSql('ALTER TABLE appointment CHANGE doctor_id doctor_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F84432B07E31 FOREIGN KEY (doctor_id_id) REFERENCES doctor (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_FE38F84432B07E31 ON appointment (doctor_id_id)');
        $this->addSql('ALTER TABLE doctor DROP FOREIGN KEY FK_1FC0F36AA76ED395');
        $this->addSql('ALTER TABLE doctor DROP FOREIGN KEY FK_1FC0F36AAE80F5DF');
        $this->addSql('DROP INDEX UNIQ_1FC0F36AA76ED395 ON doctor');
        $this->addSql('DROP INDEX IDX_1FC0F36AAE80F5DF ON doctor');
        $this->addSql('ALTER TABLE doctor ADD user_id_id INT NOT NULL, ADD department_id_id INT NOT NULL, DROP user_id, DROP department_id');
        $this->addSql('ALTER TABLE doctor ADD CONSTRAINT FK_1FC0F36A64E7214B FOREIGN KEY (department_id_id) REFERENCES department (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE doctor ADD CONSTRAINT FK_1FC0F36A9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1FC0F36A9D86650F ON doctor (user_id_id)');
        $this->addSql('CREATE INDEX IDX_1FC0F36A64E7214B ON doctor (department_id_id)');
        $this->addSql('ALTER TABLE report DROP FOREIGN KEY FK_C42F7784E5B533F9');
        $this->addSql('DROP INDEX UNIQ_C42F7784E5B533F9 ON report');
        $this->addSql('ALTER TABLE report CHANGE appointment_id appointment_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE report ADD CONSTRAINT FK_C42F77849334AFB9 FOREIGN KEY (appointment_id_id) REFERENCES appointment (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C42F77849334AFB9 ON report (appointment_id_id)');
    }
}
