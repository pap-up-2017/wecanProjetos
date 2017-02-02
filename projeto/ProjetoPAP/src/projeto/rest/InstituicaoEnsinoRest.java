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
import projeto.entity.InstituicaoEnsino;

@Path("/instituicaorest")
public class InstituicaoEnsinoRest {
	
	// get para puxar todas as instituicoes no banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<InstituicaoEnsino> listarInstituicoes() {
		InterfaceDao<InstituicaoEnsino> dao = FactoryDao.createInstituicaoEnsinoDao();
		return dao.listar();	
	}
	
	// post para cadastro de uma nova Instituicao.
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarInstituicao(InstituicaoEnsino instituicao) {	
		InterfaceDao<InstituicaoEnsino> dao = FactoryDao.createInstituicaoEnsinoDao();
		if (instituicao.getIdInstituicao() < 1){
			dao.salvar(instituicao);		
		}
	}
	
	// post para alterar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarInstituicao(InstituicaoEnsino instituicao) {
		InterfaceDao<InstituicaoEnsino> dao = FactoryDao.createInstituicaoEnsinoDao();
		if (instituicao.getIdInstituicao() > 0){
			dao.alterar(instituicao);
		}
	}
	
	// post para excluir um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarInstituicao(InstituicaoEnsino instituicao) {
		InterfaceDao<InstituicaoEnsino> dao = FactoryDao.createInstituicaoEnsinoDao();
		if (instituicao.getIdInstituicao() > 0){
			dao.excluir(instituicao);
		}
	}

}
