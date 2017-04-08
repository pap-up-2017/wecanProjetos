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
import projeto.util.Datas;

@Path("/projetorest")
public class ProjetoRest {

	// get para puxar todos os projetos do banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Projeto> listarProjetos() {
		InterfaceDao<Projeto> dao = FactoryDao.createProjetoDao();
		return dao.listar();	
	}
	
	// post para cadastro de um novo projeto.
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarProjeto(Projeto projeto) {	
		InterfaceDao<Projeto> dao = FactoryDao.createProjetoDao();
		if (projeto.getIdProjeto() < 1){
			// Registro a quantidade de participantes mais o organizador
			projeto.setParticipantes(projeto.getUsuarios().size()+1);
			projeto.setDataCriacao(Datas.retornaDataAtual());
			projeto.setStatus("Aberto");
			dao.salvar(projeto);		
		}
	}
	
	// post para alterar um projeto no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarProjeto(Projeto projeto) {
		InterfaceDao<Projeto> dao = FactoryDao.createProjetoDao();
		if (projeto.getIdProjeto() > 0){
			dao.alterar(projeto);
		}
	}
	
	// post para excluir um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarProjeto(Projeto projeto) {
		InterfaceDao<Projeto> dao = FactoryDao.createProjetoDao();
		if (projeto.getIdProjeto() > 0){
			dao.excluir(projeto);
		}
	}
}
