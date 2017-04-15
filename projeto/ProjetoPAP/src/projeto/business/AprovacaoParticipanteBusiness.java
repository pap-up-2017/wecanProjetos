package projeto.business;

import java.util.ArrayList;
import java.util.List;

import projeto.dao.AprovacaoParticipanteDao;
import projeto.dao.FactoryDao;
import projeto.dao.InterfaceProjetoDao;
import projeto.dao.ProjetoDao;
import projeto.entity.AprovacaoParticipante;
import projeto.entity.Projeto;
import projeto.entity.Usuario;
import projeto.util.Datas;

public class AprovacaoParticipanteBusiness {
	
	public void solicitar(Usuario u, Projeto p){
		AprovacaoParticipante AprovPart = new AprovacaoParticipante();
		
		AprovPart.setIdUsuarioSolicitante(u);
		AprovPart.setIdProjeto(p);
		AprovPart.setDataCriacao(Datas.retornaDataAtual());
		AprovPart.setStatus("Aguardando Aprovação");
		AprovacaoParticipanteDao dao = FactoryDao.createAprovacaoParticipanteDao();
		dao.salvar(AprovPart);
		return;
	}
	
	public void aceitar(AprovacaoParticipante AprovPart){
		
		// Atualiza o status da solicitação
		AprovPart.setStatus("Aprovado");
		AprovacaoParticipanteDao daoAprov = FactoryDao.createAprovacaoParticipanteDao();
		daoAprov.alterar(AprovPart);
		//Inclui usuário no projeto
		InterfaceProjetoDao<Projeto> daoProjeto = FactoryDao.createProjetoDao();
		Projeto projeto = daoProjeto.getObjById(AprovPart.getIdProjeto().getIdProjeto());
		List<Usuario> usuarios = projeto.getUsuarios();
		usuarios.add(AprovPart.getIdUsuarioSolicitante());
		projeto.setUsuarios(usuarios);
		daoProjeto.alterar(projeto);
		return;
	}
	
	public void recusar(AprovacaoParticipante AprovPart){
		
		// Atualiza o status da solicitação
		AprovPart.setStatus("Recusado");
		AprovacaoParticipanteDao daoAprov = FactoryDao.createAprovacaoParticipanteDao();
		daoAprov.alterar(AprovPart);
		return;
	}
	
}
