<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230619145346 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE address (id INT AUTO_INCREMENT NOT NULL, traject_id INT DEFAULT NULL, type_id INT DEFAULT NULL, address VARCHAR(255) DEFAULT NULL, complement VARCHAR(255) DEFAULT NULL, zip_code VARCHAR(10) DEFAULT NULL, city VARCHAR(255) NOT NULL, INDEX IDX_D4E6F81A0CADD4 (traject_id), INDEX IDX_D4E6F81C54C8C93 (type_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE brand (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE car (id INT AUTO_INCREMENT NOT NULL, owner_id INT DEFAULT NULL, model_id INT DEFAULT NULL, car_picture VARCHAR(255) DEFAULT NULL, color VARCHAR(255) DEFAULT NULL, places SMALLINT NOT NULL, small_baggage SMALLINT NOT NULL, large_baggage SMALLINT NOT NULL, INDEX IDX_773DE69D7E3C61F9 (owner_id), INDEX IDX_773DE69D7975B7E7 (model_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE comment (id INT AUTO_INCREMENT NOT NULL, owner_id INT DEFAULT NULL, comment LONGTEXT DEFAULT NULL, score SMALLINT DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', report TINYINT(1) DEFAULT NULL, INDEX IDX_9474526C7E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE favorite (id INT AUTO_INCREMENT NOT NULL, owner_id INT DEFAULT NULL, user_id LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:json)\', INDEX IDX_68C58ED97E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE model (id INT AUTO_INCREMENT NOT NULL, brand_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_D79572D944F5D008 (brand_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE music (id INT AUTO_INCREMENT NOT NULL, music_option_id INT DEFAULT NULL, genre VARCHAR(255) NOT NULL, INDEX IDX_CD52224A750E8BCE (music_option_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `option` (id INT AUTO_INCREMENT NOT NULL, owner_id INT DEFAULT NULL, silence TINYINT(1) NOT NULL, smoke TINYINT(1) NOT NULL, animals TINYINT(1) NOT NULL, music TINYINT(1) NOT NULL, INDEX IDX_5A8600B07E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reservation (id INT AUTO_INCREMENT NOT NULL, traject_ref_id INT DEFAULT NULL, accepted TINYINT(1) NOT NULL, places SMALLINT NOT NULL, small_baggage SMALLINT NOT NULL, large_baggage SMALLINT NOT NULL, booked_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_42C84955C68EF6E6 (traject_ref_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE traject (id INT AUTO_INCREMENT NOT NULL, owner_id INT DEFAULT NULL, passengers LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:json)\', places SMALLINT NOT NULL, price SMALLINT NOT NULL, small_baggage SMALLINT NOT NULL, large_baggage SMALLINT NOT NULL, start_time DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_64CC4A9C7E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE type_address (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(20) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, pseudo VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', last_activity DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', avatar VARCHAR(255) DEFAULT NULL, birth_date DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', is_verified TINYINT(1) DEFAULT NULL, total_credits INT NOT NULL, report TINYINT(1) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), UNIQUE INDEX UNIQ_8D93D64986CC499D (pseudo), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_reservation (user_id INT NOT NULL, reservation_id INT NOT NULL, INDEX IDX_EBD380C0A76ED395 (user_id), INDEX IDX_EBD380C0B83297E7 (reservation_id), PRIMARY KEY(user_id, reservation_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE address ADD CONSTRAINT FK_D4E6F81A0CADD4 FOREIGN KEY (traject_id) REFERENCES traject (id)');
        $this->addSql('ALTER TABLE address ADD CONSTRAINT FK_D4E6F81C54C8C93 FOREIGN KEY (type_id) REFERENCES type_address (id)');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT FK_773DE69D7E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT FK_773DE69D7975B7E7 FOREIGN KEY (model_id) REFERENCES model (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C7E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE favorite ADD CONSTRAINT FK_68C58ED97E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE model ADD CONSTRAINT FK_D79572D944F5D008 FOREIGN KEY (brand_id) REFERENCES brand (id)');
        $this->addSql('ALTER TABLE music ADD CONSTRAINT FK_CD52224A750E8BCE FOREIGN KEY (music_option_id) REFERENCES `option` (id)');
        $this->addSql('ALTER TABLE `option` ADD CONSTRAINT FK_5A8600B07E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955C68EF6E6 FOREIGN KEY (traject_ref_id) REFERENCES traject (id)');
        $this->addSql('ALTER TABLE traject ADD CONSTRAINT FK_64CC4A9C7E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_reservation ADD CONSTRAINT FK_EBD380C0A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_reservation ADD CONSTRAINT FK_EBD380C0B83297E7 FOREIGN KEY (reservation_id) REFERENCES reservation (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE address DROP FOREIGN KEY FK_D4E6F81A0CADD4');
        $this->addSql('ALTER TABLE address DROP FOREIGN KEY FK_D4E6F81C54C8C93');
        $this->addSql('ALTER TABLE car DROP FOREIGN KEY FK_773DE69D7E3C61F9');
        $this->addSql('ALTER TABLE car DROP FOREIGN KEY FK_773DE69D7975B7E7');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C7E3C61F9');
        $this->addSql('ALTER TABLE favorite DROP FOREIGN KEY FK_68C58ED97E3C61F9');
        $this->addSql('ALTER TABLE model DROP FOREIGN KEY FK_D79572D944F5D008');
        $this->addSql('ALTER TABLE music DROP FOREIGN KEY FK_CD52224A750E8BCE');
        $this->addSql('ALTER TABLE `option` DROP FOREIGN KEY FK_5A8600B07E3C61F9');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955C68EF6E6');
        $this->addSql('ALTER TABLE traject DROP FOREIGN KEY FK_64CC4A9C7E3C61F9');
        $this->addSql('ALTER TABLE user_reservation DROP FOREIGN KEY FK_EBD380C0A76ED395');
        $this->addSql('ALTER TABLE user_reservation DROP FOREIGN KEY FK_EBD380C0B83297E7');
        $this->addSql('DROP TABLE address');
        $this->addSql('DROP TABLE brand');
        $this->addSql('DROP TABLE car');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE favorite');
        $this->addSql('DROP TABLE model');
        $this->addSql('DROP TABLE music');
        $this->addSql('DROP TABLE `option`');
        $this->addSql('DROP TABLE reservation');
        $this->addSql('DROP TABLE traject');
        $this->addSql('DROP TABLE type_address');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_reservation');
    }
}
