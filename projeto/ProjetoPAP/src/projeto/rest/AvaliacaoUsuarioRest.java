package projeto.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import projeto.business.AvaliacaoUsuarioBusiness;
import projeto.dao.AvaliacaoUsuarioDao;
import projeto.entity.AvaliacaoUsuario;

@Path("/avaliacaousuariorest")
public class AvaliacaoUsuarioRest {
	
	// puxa por usuario
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getporusuario/{id}")
	public List<AvaliacaoUsuario> listarPorUsuario(@PathParam("id") int id) {
		AvaliacaoUsuarioBusiness bus = new AvaliacaoUsuarioBusiness();
		return bus.buscarPorUsuario(id);
	}
	
	// puxa por projeto
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getporprojeto/{id}")
	public List<AvaliacaoUsuario> listarPorProjeto(@PathParam("id") int id) {
		AvaliacaoUsuarioBusiness bus = new AvaliacaoUsuarioBusiness();
		return bus.buscarPorProjeto(id);
	}
	
	// puxa por usuario e projeto
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getporprojeto/{idUsuario}/{idProjeto}")
	public List<AvaliacaoUsuario> listarPorUsuarioAndProjeto(@PathParam("idUsuario") int idUsuario, @PathParam("idProjeto") int idProjeto ){
		AvaliacaoUsuarioBusiness bus = new AvaliacaoUsuarioBusiness();
		return bus.buscarPorUsuarioAndProjeto(idUsuario, idProjeto);
	}
	
	// post cad de avaliacao
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad/{idUsuario}")
	public void cadastrarAvaliacaoUsuario(@PathParam("idUsuario") int idUsuario, AvaliacaoUsuario aval) {	
		AvaliacaoUsuarioBusiness bus = new AvaliacaoUsuarioBusiness();
		bus.create(aval, idUsuario);
	}
}
