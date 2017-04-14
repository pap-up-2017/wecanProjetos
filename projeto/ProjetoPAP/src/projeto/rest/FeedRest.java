package projeto.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Feed;
import projeto.entity.Resposta;
import projeto.entity.Usuario;

@Path("/feedrest")
public class FeedRest {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Feed> listarFeeds() {
		InterfaceDao<Feed> dao = FactoryDao.createFeedDao();
		return dao.listar();	
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getresposta")
	public List<Resposta> listarRespostas() {
		InterfaceDao<Resposta> dao = FactoryDao.createRespostaDao();
		return dao.listar();	
	}
	
	// post para salvar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarFeed(Feed f) {
		InterfaceDao<Feed> dao = FactoryDao.createFeedDao();
		if (f.getIdFeed() < 1){
			dao.salvar(f);		
		}
	}
	
	// post para salvar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcadresposta/{id}")
	public void cadastrarResposta(@PathParam("id") String id, Resposta r) {
		InterfaceDao<Resposta> dao = FactoryDao.createRespostaDao();
		InterfaceDao<Usuario> userDao = FactoryDao.createUsuarioDao();
		r.setUsuarioResposta(userDao.getObjById(Integer.parseInt(id)));
		if (r.getIdResposta() < 1){
			dao.salvar(r);		
		}
	}
	
	// post para alterar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarFeed(Feed f) {
		InterfaceDao<Feed> dao = FactoryDao.createFeedDao();
		if (f.getIdFeed() > 0){
			dao.alterar(f);
		}
	}
	
	// post para excluir um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarFeed(Feed f) {
		InterfaceDao<Feed> dao = FactoryDao.createFeedDao();
		if (f.getIdFeed() > 0){
			dao.excluir(f);
		}
	}
}
