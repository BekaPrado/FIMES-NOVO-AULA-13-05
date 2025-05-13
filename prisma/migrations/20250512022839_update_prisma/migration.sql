/*
  Warnings:

  - You are about to drop the `tbl_teste` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `tbl_teste`;

-- CreateTable
CREATE TABLE `tbl_filme` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `duracao` TIME(0) NULL,
    `sinopse` TEXT NULL,
    `data_lancamento` DATE NULL,
    `foto_capa` VARCHAR(200) NULL,
    `link_trailer` VARCHAR(200) NULL,
    `tb_pais_id` INTEGER NULL,
    `tb_idioma_id` INTEGER NULL,

    INDEX `FK_IDIOMA_FILME`(`tb_idioma_id`),
    INDEX `FK_PAIS_FILME`(`tb_pais_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_genero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_idioma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `arquivo_url` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_nacionalidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nacionalidade` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_ator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `tb_sexo_id` INTEGER NULL,

    INDEX `FK_SEXO_ATOR`(`tb_sexo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_ator_nacionalidade` (
    `tbl_ator_id` INTEGER NOT NULL,
    `tbl_nacionalidade_id` INTEGER NOT NULL,

    INDEX `FK_NACIONALIDADE_ATOR`(`tbl_nacionalidade_id`),
    PRIMARY KEY (`tbl_ator_id`, `tbl_nacionalidade_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_avaliacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nota` DECIMAL(3, 1) NOT NULL,
    `comentario` TEXT NULL,
    `data_avaliacao` DATE NOT NULL,
    `tb_usuario_id` INTEGER NULL,
    `tb_filme_id` INTEGER NULL,

    INDEX `FK_FILME_AVALIACAO`(`tb_filme_id`),
    INDEX `FK_USUARIO_AVALIACAO`(`tb_usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_diretor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `tb_sexo_id` INTEGER NULL,

    INDEX `FK_SEXO_DIRETOR`(`tb_sexo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_diretor_nacionalidade` (
    `tb_diretor_id` INTEGER NOT NULL,
    `tb_nacionalidade_id` INTEGER NOT NULL,

    INDEX `FK_NACIONALIDADE_DIRETOR`(`tb_nacionalidade_id`),
    PRIMARY KEY (`tb_diretor_id`, `tb_nacionalidade_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_filme_ator` (
    `tb_filme_id` INTEGER NOT NULL,
    `tb_ator_id` INTEGER NOT NULL,

    INDEX `FK_ATOR_FILME`(`tb_ator_id`),
    PRIMARY KEY (`tb_filme_id`, `tb_ator_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_filme_diretor` (
    `tb_filme_id` INTEGER NOT NULL,
    `tb_diretor_id` INTEGER NOT NULL,

    INDEX `FK_DIRETOR_FILME`(`tb_diretor_id`),
    PRIMARY KEY (`tb_filme_id`, `tb_diretor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_filme_genero` (
    `tb_filme_id` INTEGER NOT NULL,
    `tb_genero_id` INTEGER NOT NULL,

    INDEX `FK_GENERO_FILME`(`tb_genero_id`),
    PRIMARY KEY (`tb_filme_id`, `tb_genero_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_filme_produtora` (
    `tb_filme_id` INTEGER NOT NULL,
    `tb_produtora_id` INTEGER NOT NULL,

    INDEX `FK_PRODUTORA_FILME`(`tb_produtora_id`),
    PRIMARY KEY (`tb_filme_id`, `tb_produtora_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_legenda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `formato` VARCHAR(45) NOT NULL,
    `arquivo_url` VARCHAR(200) NULL,
    `sincronizacao` VARCHAR(45) NULL,
    `data_criacao` DATE NULL,
    `tb_idioma_id` INTEGER NULL,

    INDEX `FK_IDIOMA_LEGENDA`(`tb_idioma_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_produtora` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `fundacao` VARCHAR(45) NULL,
    `pais` VARCHAR(20) NULL,
    `tb_pais_id` INTEGER NULL,

    INDEX `FK_PAIS_PRODUTORA`(`tb_pais_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_sexo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `senha` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_filme` ADD CONSTRAINT `FK_IDIOMA_FILME` FOREIGN KEY (`tb_idioma_id`) REFERENCES `tbl_idioma`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_filme` ADD CONSTRAINT `FK_PAIS_FILME` FOREIGN KEY (`tb_pais_id`) REFERENCES `tbl_pais`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_ator` ADD CONSTRAINT `FK_SEXO_ATOR` FOREIGN KEY (`tb_sexo_id`) REFERENCES `tbl_sexo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_ator_nacionalidade` ADD CONSTRAINT `FK_ATOR_NACIONALIDADE` FOREIGN KEY (`tbl_ator_id`) REFERENCES `tbl_ator`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_ator_nacionalidade` ADD CONSTRAINT `FK_NACIONALIDADE_ATOR` FOREIGN KEY (`tbl_nacionalidade_id`) REFERENCES `tbl_nacionalidade`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_avaliacao` ADD CONSTRAINT `FK_FILME_AVALIACAO` FOREIGN KEY (`tb_filme_id`) REFERENCES `tbl_filme`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_avaliacao` ADD CONSTRAINT `FK_USUARIO_AVALIACAO` FOREIGN KEY (`tb_usuario_id`) REFERENCES `tbl_usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_diretor` ADD CONSTRAINT `FK_SEXO_DIRETOR` FOREIGN KEY (`tb_sexo_id`) REFERENCES `tbl_sexo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_diretor_nacionalidade` ADD CONSTRAINT `FK_DIRETOR_NACIONALIDADE` FOREIGN KEY (`tb_diretor_id`) REFERENCES `tbl_diretor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_diretor_nacionalidade` ADD CONSTRAINT `FK_NACIONALIDADE_DIRETOR` FOREIGN KEY (`tb_nacionalidade_id`) REFERENCES `tbl_nacionalidade`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_filme_ator` ADD CONSTRAINT `FK_ATOR_FILME` FOREIGN KEY (`tb_ator_id`) REFERENCES `tbl_ator`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_filme_ator` ADD CONSTRAINT `FK_FILME_ATOR` FOREIGN KEY (`tb_filme_id`) REFERENCES `tbl_filme`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_filme_diretor` ADD CONSTRAINT `FK_DIRETOR_FILME` FOREIGN KEY (`tb_diretor_id`) REFERENCES `tbl_diretor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_filme_diretor` ADD CONSTRAINT `FK_FILME_DIRETOR` FOREIGN KEY (`tb_filme_id`) REFERENCES `tbl_filme`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_filme_genero` ADD CONSTRAINT `FK_FILME_GENERO` FOREIGN KEY (`tb_filme_id`) REFERENCES `tbl_filme`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_filme_genero` ADD CONSTRAINT `FK_GENERO_FILME` FOREIGN KEY (`tb_genero_id`) REFERENCES `tbl_genero`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_filme_produtora` ADD CONSTRAINT `FK_FILME_PRODUTORA` FOREIGN KEY (`tb_filme_id`) REFERENCES `tbl_filme`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_filme_produtora` ADD CONSTRAINT `FK_PRODUTORA_FILME` FOREIGN KEY (`tb_produtora_id`) REFERENCES `tbl_produtora`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_legenda` ADD CONSTRAINT `FK_IDIOMA_LEGENDA` FOREIGN KEY (`tb_idioma_id`) REFERENCES `tbl_idioma`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_produtora` ADD CONSTRAINT `FK_PAIS_PRODUTORA` FOREIGN KEY (`tb_pais_id`) REFERENCES `tbl_pais`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
