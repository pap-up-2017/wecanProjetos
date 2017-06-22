package projeto.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import projeto.business.ComentarioUsuarioBusiness;
import projeto.entity.ComentarioUsuario;

@Path("/comentariousuariorest")
public class ComentarioUsuarioRest {
	
	// puxa por usuario que recebeu
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getrecebecomentario/{id}")
	public List<ComentarioUsuario> listarPorUsuarioQueRecebe(@PathParam("id") int id) {
		ComentarioUsuarioBusiness bus = new ComentarioUsuarioBusiness();
		return bus.listaPorComentariosRecebidosPeloUsuario(id);
	}

	// puxa por usuario que recebeu
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getenviacomentario/{id}")
	public List<ComentarioUsuario> listarPorUsuarioQueEnvia(@PathParam("id") int id) {
		ComentarioUsuarioBusiness bus = new ComentarioUsuarioBusiness();
		return bus.listaPorComentariosGeradosPeloUsuario(id);
	}
	
	// puxa por projeto
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getprojeto/{id}")
	public List<ComentarioUsuario> listarPorProjeto(@PathParam("id") int id) {
		ComentarioUsuarioBusiness bus = new ComentarioUsuarioBusiness();
		return bus.listaPorComentariosGeradosDentroDoProjeto(id);
	}
	
	// salva um comentario
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad/{idUsuario}")
	public void cadastrarComentarioUsuario(@PathParam("idUsuario") int idUsuarioCriador, ComentarioUsuario comentario) {	
		ComentarioUsuarioBusiness bus = new ComentarioUsuarioBusiness();
		bus.create(comentario, idUsuarioCriador);
	}
	
	//altera um comentario
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt/{idUsuario}")
	public void alterarComentario(@PathParam("idUsuario") int idUsuarioCriador, ComentarioUsuario comentario){
		ComentarioUsuarioBusiness bus = new ComentarioUsuarioBusiness();
		bus.alterarComentario(comentario, idUsuarioCriador);
	}
	
	//exclui um comentario
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void excluirComentario(ComentarioUsuario comentario){
		ComentarioUsuarioBusiness bus = new ComentarioUsuarioBusiness();
		bus.excluirComentario(comentario);
	}
}
