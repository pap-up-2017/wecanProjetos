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
import projeto.dao.RespostaUsuarioDao;
import projeto.entity.RespostaUsuario;

@Path("/respostausuariorest")
public class RespostaUsuarioRest {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/listarespostausuario/{idUsuario}")
	public List<RespostaUsuario> listarRespostasUsuariobyId(@PathParam("idUsuario") int id) {
		RespostaUsuarioDao dao = FactoryDao.createRespostaUsuarioDao();
		return dao.listarPorUsuario(id);	
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<RespostaUsuario> listarRespostasUsuario() {
		RespostaUsuarioDao dao = FactoryDao.createRespostaUsuarioDao();
		return dao.listar();	
	}
	
	// post para salvar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postenvio")
	public void enviarResposta(RespostaUsuario r) {
		RespostaUsuarioDao dao = FactoryDao.createRespostaUsuarioDao();
		if (r.getIdRespostaUsuario() < 1){
			dao.salvar(r);		
		}
	}
	
}
