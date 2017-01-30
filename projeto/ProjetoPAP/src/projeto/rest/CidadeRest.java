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
import projeto.entity.Cidade;

@Path("/cidaderest")
public class CidadeRest {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Cidade> listarMateriais() {
		InterfaceDao<Cidade> dao = FactoryDao.createCidadeDao();
		return dao.listar();	
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarEmpresa(Cidade cidade) {	
		InterfaceDao<Cidade> dao = FactoryDao.createCidadeDao();
		dao.salvar(cidade);
	}

}
