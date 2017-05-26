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
import projeto.entity.Avaliacao;


@Path("/avaliacaorest")
public class AvaliacaoRest {

	// get para puxar todas as avaliacoes no banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Avaliacao> listarAvaliacoes() {
		AvaliacaoDao dao = FactoryDao.createAvaliacaoDao();
		return dao.listar();	
	}
	
	// post para cadastro de uma nova Avaliacao.
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarAvaliacao(Avaliacao avaliacao) {	
		AvaliacaoDao dao = FactoryDao.createAvaliacaoDao();
		if (avaliacao.getIdAvaliacao() < 1){
			dao.salvar(avaliacao);		
		}
	}
	
	// post para alterar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarAvaliacao(Avaliacao avaliacao) {
		AvaliacaoDao dao = FactoryDao.createAvaliacaoDao();
		if (avaliacao.getIdAvaliacao() > 0){
			dao.alterar(avaliacao);
		}
	}
	
	// post para excluir um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarAvaliacao(Avaliacao avaliacao) {
		AvaliacaoDao dao = FactoryDao.createAvaliacaoDao();
		if (avaliacao.getIdAvaliacao() > 0){
			dao.excluir(avaliacao);
		}
	}
}
