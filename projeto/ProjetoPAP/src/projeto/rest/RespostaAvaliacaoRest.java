package projeto.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import projeto.dao.AvaliacaoDao;
import projeto.dao.FactoryDao;
import projeto.dao.RespostaAvaliacaoDao;
import projeto.entity.Avaliacao;
import projeto.entity.RespostaAvaliacao;


@Path("/respostaavaliacaorest")
public class RespostaAvaliacaoRest {

	// get para puxar todas as respostas de avaliacoes no banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<RespostaAvaliacao> listarRespostaAvaliacoes() {
		RespostaAvaliacaoDao dao = FactoryDao.createRespostaAvaliacaoDao();
		return dao.listar();	
	}
	
	// post para cadastro de uma nova resposta de avaliacao.
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarAvaliacao(RespostaAvaliacao respostaAvaliacao) {	
		RespostaAvaliacaoDao dao = FactoryDao.createRespostaAvaliacaoDao();
		if (respostaAvaliacao.getIdRespostaAvaliacao() < 1){
			dao.salvar(respostaAvaliacao);		
		}
	}
	
	// post para alterar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarAvaliacao(RespostaAvaliacao respostaAvaliacao) {
		RespostaAvaliacaoDao dao = FactoryDao.createRespostaAvaliacaoDao();
		if (respostaAvaliacao.getIdRespostaAvaliacao() > 0){
			dao.alterar(respostaAvaliacao);
		}
	}
	
	// post para excluir um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarAvaliacao(RespostaAvaliacao respostaAvaliacao) {
		RespostaAvaliacaoDao dao = FactoryDao.createRespostaAvaliacaoDao();
		if (respostaAvaliacao.getIdRespostaAvaliacao() > 0){
			dao.excluir(respostaAvaliacao);
		}
	}
}
