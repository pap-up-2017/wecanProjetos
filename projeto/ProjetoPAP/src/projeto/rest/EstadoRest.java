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
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/post")
	public void cadastrarEmpresa(Estado estado) {
		InterfaceDao<Estado> dao = FactoryDao.createEstadoDao();
		dao.salvar(estado);
	}

}
