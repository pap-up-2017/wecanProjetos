-- Delete -- 
drop database groupdatabase

-- Create -- 
create database groupdatabase

-- use -- 
use groupdatabase

-- insert **IMPORTANTE** as tabelas no banco já devem estar criadas -- 

INSERT INTO `groupdatabase`.`estado` (`nomeEstado`, `siglaEstado`) VALUES ('Paraná', 'PR');
INSERT INTO `groupdatabase`.`cidade` (`nomeCidade`, `estadoCidade_idEstado`) VALUES ('Curitiba ', '1');
INSERT INTO `groupdatabase`.`instituicaoEnsino` (`nomeInstituicao`, `cidadeInstituicao_idCidade`) VALUES ('Universidade Positivo', '1');
INSERT INTO `groupdatabase`.`curso` (`nomeCurso`, `instituicaoCurso_idInstituicao`) VALUES ('Analise e Desenvolvimento de sistemas', '1');
INSERT INTO `groupdatabase`.`tipoUsuario` (`tipoUsuario`) VALUES ('Administrador');
INSERT INTO `groupdatabase`.`usuario` (`emailUsuario`, `nomeUsuario`, `senhaUsuario`, `usernameUsuario`, `cidadeUsuario_idCidade`, `cursoUsuario_idCurso`, `instituicaoUsuario_idInstituicao`, `tipoUsuario_idTipoUsuario`) VALUES ('adm@wecan.com', 'Administrador do Sistema', upper(MD5('wecanADM')), 'admin', '1', '1', '1', '1');

select *from usuario







