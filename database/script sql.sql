#cria um novo database
create database db_controle_filmes_ab;

#ativa o database a ser utilizado
use db_controle_filmes_ab;

#cricao da tabela de filme
CREATE DATABASE db_controle_filmes_ab;
USE db_controle_filmes_ab;

create table tbl_filme (
id                int not null primary key auto_increment,
titulo            varchar(45) not null,
duracao           time,
sinopse           text,
data_lancamento   date,
foto_capa         varchar(200),
link_trailer      varchar(200),
tb_pais_id        int,
tb_idioma_id      int,

constraint FK_PAIS_FILME
    foreign key (tb_pais_id)
    references tbl_pais(id),

constraint FK_IDIOMA_FILME
    foreign key (tb_idioma_id)
    references tbl_idioma(id)

);

create table tbl_pais (
id int not null primary key auto_increment,
nome varchar(45) not null
);

create table tbl_idioma (
id int not null primary key auto_increment,
nome varchar(45) not null,
arquivo_url varchar(45)
);

create table tbl_genero (
id int not null primary key auto_increment,
nome varchar(45) not null
);

create table tbl_sexo (
id int not null primary key auto_increment,
descricao varchar(45) not null
);

create table tbl_ator (
id int not null primary key auto_increment,
nome varchar(45) not null,
tb_sexo_id int,

constraint FK_SEXO_ATOR
    foreign key (tb_sexo_id)
    references tbl_sexo(id)

);

create table tbl_diretor (
id int not null primary key auto_increment,
nome varchar(45) not null,
tb_sexo_id int,

constraint FK_SEXO_DIRETOR
    foreign key (tb_sexo_id)
    references tbl_sexo(id)

);

create table tbl_produtora (
id int not null primary key auto_increment,
nome varchar(45) not null,
fundacao varchar(45),
pais varchar(20),
tb_pais_id int,

constraint FK_PAIS_PRODUTORA
    foreign key (tb_pais_id)
    references tbl_pais(id)

);

create table tbl_nacionalidade (
id int not null primary key auto_increment,
nacionalidade varchar(45) not null
);

create table tbl_usuario (
id int not null primary key auto_increment,
nome varchar(45) not null,
email varchar(45) not null,
senha varchar(45) not null
);

create table tbl_legenda (
id int not null primary key auto_increment,
formato varchar(45) not null,
arquivo_url varchar(200),
sincronizacao varchar(45),
data_criacao date,
tb_idioma_id int,

constraint FK_IDIOMA_LEGENDA
    foreign key (tb_idioma_id)
    references tbl_idioma(id)

);

create table tbl_avaliacao (
id int not null primary key auto_increment,
nota decimal(3,1) not null,
comentario text,
data_avaliacao date not null,
tb_usuario_id int,
tb_filme_id int,

constraint FK_USUARIO_AVALIACAO
    foreign key (tb_usuario_id)
    references tbl_usuario(id),

constraint FK_FILME_AVALIACAO
    foreign key (tb_filme_id)
    references tbl_filme(id)

);

create table tbl_filme_genero (
tb_filme_id int not null,
tb_genero_id int not null,
primary key (tb_filme_id, tb_genero_id),

constraint FK_FILME_GENERO
    foreign key (tb_filme_id)
    references tbl_filme(id),

constraint FK_GENERO_FILME
    foreign key (tb_genero_id)
    references tbl_genero(id)

);

create table tbl_filme_produtora (
tb_filme_id int not null,
tb_produtora_id int not null,
primary key (tb_filme_id, tb_produtora_id),

constraint FK_FILME_PRODUTORA
    foreign key (tb_filme_id)
    references tbl_filme(id),

constraint FK_PRODUTORA_FILME
    foreign key (tb_produtora_id)
    references tbl_produtora(id)

);

create table tbl_filme_ator (
tb_filme_id int not null,
tb_ator_id int not null,
primary key (tb_filme_id, tb_ator_id),

constraint FK_FILME_ATOR
    foreign key (tb_filme_id)
    references tbl_filme(id),

constraint FK_ATOR_FILME
    foreign key (tb_ator_id)
    references tbl_ator(id)

);

create table tbl_filme_diretor (
tb_filme_id int not null,
tb_diretor_id int not null,
primary key (tb_filme_id, tb_diretor_id),

constraint FK_FILME_DIRETOR
    foreign key (tb_filme_id)
    references tbl_filme(id),

constraint FK_DIRETOR_FILME
    foreign key (tb_diretor_id)
    references tbl_diretor(id)

);

/*sem dublador*/
create table tbl_filme_dublador (
tb_filme_id int not null,
tb_dublador_id int not null,
tb_idioma_id int not null,
primary key (tb_filme_id, tb_dublador_id, tb_idioma_id),

constraint FK_FILME_DUBLADOR
    foreign key (tb_filme_id)
    references tbl_filme(id),

constraint FK_IDIOMA_DUBLADOR
    foreign key (tb_idioma_id)
    references tbl_idioma(id),

constraint FK_DUBLADOR_FILME
    foreign key (tb_dublador_id)
    references tbl_dublador(id)

);

create table tbl_ator_nacionalidade (
tbl_ator_id          int not null,
tbl_nacionalidade_id int not null,
primary key (tbl_ator_id, tbl_nacionalidade_id),

constraint FK_ATOR_NACIONALIDADE
    foreign key (tbl_ator_id)
    references tbl_ator(id),

constraint FK_NACIONALIDADE_ATOR
    foreign key (tbl_nacionalidade_id)
    references tbl_nacionalidade(id)

);

create table tbl_diretor_nacionalidade (
tb_diretor_id int not null,
tb_nacionalidade_id int not null,
primary key (tb_diretor_id, tb_nacionalidade_id),

constraint FK_DIRETOR_NACIONALIDADE
    foreign key (tb_diretor_id)
    references tbl_diretor(id),

constraint FK_NACIONALIDADE_DIRETOR
    foreign key (tb_nacionalidade_id)
    references tbl_nacionalidade(id)

);

show tables;

desc tbl_filme;

select * from tbl_filme;