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
import projeto.entity.Projeto;
import projeto.entity.TipoUsuario;

@Path("/tipousuariorest")
public class TipoUsuarioRest {
	
	// get lista do banco
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<TipoUsuario> listarTipoUsuario() {
		InterfaceDao<TipoUsuario> dao = FactoryDao.createTipoUsuarioDao();
		return dao.listar();	
	}
	
	// post cadastro
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarTipoUsuario(TipoUsuario tipoUsuario) {	
		InterfaceDao<TipoUsuario> dao = FactoryDao.createTipoUsuarioDao();
		if (tipoUsuario.getIdTipoUsuario() < 1){
			dao.salvar(tipoUsuario);		
		}
	}
	
	// post alterar
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarTipoUsuario(TipoUsuario tipoUsuario) {
		InterfaceDao<TipoUsuario> dao = FactoryDao.createTipoUsuarioDao();
		if (tipoUsuario.getIdTipoUsuario() > 0){
			dao.alterar(tipoUsuario);
		}
	}
	
	// post excluir. 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarTipoUsuario(TipoUsuario tipoUsuario) {
		InterfaceDao<TipoUsuario> dao = FactoryDao.createTipoUsuarioDao();
		if (tipoUsuario.getIdTipoUsuario() > 0){
			dao.excluir(tipoUsuario);
		}
	}

}
