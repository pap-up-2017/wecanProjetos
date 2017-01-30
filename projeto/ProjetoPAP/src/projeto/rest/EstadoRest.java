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
import projeto.entity.Estado;

@Path("/estadorest")
public class EstadoRest {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Estado> listarMateriais() {
		InterfaceDao<Estado> dao = FactoryDao.createEstadoDao();
		return dao.listar();	
	}
	
	// post para salvar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarEmpresa(Estado estado) {
		InterfaceDao<Estado> dao = FactoryDao.createEstadoDao();
		if (estado.getIdEstado() < 1){
			dao.salvar(estado);		
		}
	}
	
	// post para alterar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void cadastrarEmpresaa(Estado estado) {
		InterfaceDao<Estado> dao = FactoryDao.createEstadoDao();
		if (estado.getIdEstado() > 0){
			dao.alterar(estado);
		}
	}

}
