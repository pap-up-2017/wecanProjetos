package projeto.business;

import java.util.UUID;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.AprovacaoParticipante;
import projeto.entity.Projeto;
import projeto.entity.Usuario;
import projeto.entity.UsuarioLogado;
import projeto.util.Datas;

public class AprovacaoParticipanteBusiness {
	
	public void solicitar(Usuario u, Projeto p){
		AprovacaoParticipante AprovPart = new AprovacaoParticipante();
		
		AprovPart.setIdUsuarioSolicitante(u.getIdUsuario());
		AprovPart.setIdProjeto(p.getIdProjeto());
		AprovPart.setDataCriacao(Datas.retornaDataAtual());
		AprovPart.setStatus("Aguardando Aprovação");
		InterfaceDao<AprovacaoParticipante> dao = FactoryDao.createAprovacaoParticipanteDao();
		dao.salvar(AprovPart);
		return;
	}
}
