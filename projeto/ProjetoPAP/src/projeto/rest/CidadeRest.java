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

	// get para puxar todas as cidades no banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Cidade> listarCidades() {
		InterfaceDao<Cidade> dao = FactoryDao.createCidadeDao();
		return dao.listar();	
	}
	
	// post para cadastro de uma nova cidade.
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarCidade(Cidade cidade) {	
		InterfaceDao<Cidade> dao = FactoryDao.createCidadeDao();
		if (cidade.getIdCidade() < 1){
			dao.salvar(cidade);		
		}
	}
	
	// post para alterar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarCidade(Cidade cidade) {
		InterfaceDao<Cidade> dao = FactoryDao.createCidadeDao();
		if (cidade.getIdCidade() > 0){
			dao.alterar(cidade);
		}
	}
	
	// post para excluir um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarCidade(Cidade cidade) {
		InterfaceDao<Cidade> dao = FactoryDao.createCidadeDao();
		if (cidade.getIdCidade() > 0){
			dao.excluir(cidade);
		}
	}
}
