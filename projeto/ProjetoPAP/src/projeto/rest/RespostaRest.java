package projeto.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Resposta;

@Path("/respostarest")
public class RespostaRest {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Resposta> listarRespostas() {
		InterfaceDao<Resposta> dao = FactoryDao.createRespostaDao();
		return dao.listar();	
	}
	
	// post para salvar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarResposta(Resposta r) {
		InterfaceDao<Resposta> dao = FactoryDao.createRespostaDao();
		if (r.getIdResposta() < 1){
			dao.salvar(r);		
		}
	}
	
	// post para alterar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarResposta(Resposta r) {
		InterfaceDao<Resposta> dao = FactoryDao.createRespostaDao();
		if (r.getIdResposta() > 0){
			dao.alterar(r);
		}
	}
	
	// post para excluir um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarFeed(Resposta r) {
		InterfaceDao<Resposta> dao = FactoryDao.createRespostaDao();
		if (r.getIdResposta() > 0){
			dao.excluir(r);
		}
	}
}
