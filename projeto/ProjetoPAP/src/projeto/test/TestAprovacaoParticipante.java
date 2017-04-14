package projeto.test;

import java.util.List;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.dao.InterfaceProjetoDao;
import projeto.entity.AprovacaoParticipante;
import projeto.entity.Projeto;
import projeto.entity.Usuario;
import projeto.util.Datas;

public class TestAprovacaoParticipante {
	
	@Test
	public void cadastrarAprovacaoParticipante(){
		InterfaceDao<Usuario> daoUser = FactoryDao.createUsuarioDao();
		Usuario u = daoUser.getObjById(5);
		InterfaceProjetoDao<Projeto> daoProj = FactoryDao.createProjetoDao();
		Projeto p = daoProj.getObjById(5);		
		AprovacaoParticipante AprovPart = new AprovacaoParticipante();
		AprovPart.setIdUsuarioSolicitante(u.getIdUsuario());
		AprovPart.setIdProjeto(p.getIdProjeto());
		AprovPart.setDataCriacao(Datas.retornaDataAtual());
		InterfaceDao<AprovacaoParticipante> dao = FactoryDao.createAprovacaoParticipanteDao();
		dao.salvar(AprovPart);
	}
	
	@Test
	public void listarAprovacaoParticipante() {		
		List<AprovacaoParticipante> AprovPart = FactoryDao.createAprovacaoParticipanteDao().listar();
		if (AprovPart.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void excluirAprovacaoParticipante(){
		InterfaceDao<AprovacaoParticipante> dao = FactoryDao.createAprovacaoParticipanteDao();
		AprovacaoParticipante u = dao.getObjById(3);
		dao.excluir(u);
	}

}
