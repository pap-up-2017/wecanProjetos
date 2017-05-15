package projeto.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;

import projeto.business.AprovacaoParticipanteBusiness;
import projeto.business.ProjetoBusiness;
import projeto.dao.AprovacaoParticipanteDao;
import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.dao.InterfaceProjetoDao;
import projeto.entity.AprovacaoParticipante;
import projeto.entity.Projeto;
import projeto.entity.Usuario;
import projeto.util.CardsDashBoard;
import projeto.util.Datas;

@Path("/projetorest")
public class ProjetoRest {
	
	Gson gson = new Gson();

	// get para puxar todos os projetos do banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Projeto> listarProjetos() {
		InterfaceProjetoDao<Projeto> dao = FactoryDao.createProjetoDao();
		return dao.listar();	
	}
	
	// post para cadastro de um novo projeto.
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarProjeto(Projeto projeto) {	
		ProjetoBusiness pBus = new ProjetoBusiness();
		String result = pBus.create(projeto);
	}
	
	// post para alterar um projeto no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarProjeto(Projeto projeto) {
		InterfaceProjetoDao<Projeto> dao = FactoryDao.createProjetoDao();
		if (projeto.getIdProjeto() > 0){
			dao.alterar(projeto);
		}
	}
	
	// post para excluir um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarProjeto(Projeto projeto) {
		InterfaceProjetoDao<Projeto> dao = FactoryDao.createProjetoDao();
		if (projeto.getIdProjeto() > 0){
			dao.excluir(projeto);
		}
	}
	
	// get para puxar todos os meus projetos do banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/user/{id}")
	public List<Projeto> listarMeusProjetos(@PathParam("id") String id) {
		InterfaceProjetoDao<Projeto> dao = FactoryDao.createProjetoDao();
		return dao.listarMeusProjetos(id);
	}
	
	// get para puxar um projeto por id.
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Projeto getProjetoById(@PathParam("id") int id) {
		InterfaceProjetoDao<Projeto> dao = FactoryDao.createProjetoDao();
		return dao.getObjById(id);	
	}
	
	// post solicitar participação no projeto 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/solAprov/{idUsuario}/{idProjeto}")
	public void solicitar(@PathParam("idUsuario") int idUsuario, @PathParam("idProjeto") int idProjeto) {

		InterfaceDao<Usuario> daoUser = FactoryDao.createUsuarioDao();
		Usuario u = daoUser.getObjById(idUsuario);
		InterfaceProjetoDao<Projeto> daoProj = FactoryDao.createProjetoDao();
		Projeto p = daoProj.getObjById(idProjeto);	
		AprovacaoParticipanteBusiness AprovPart = new AprovacaoParticipanteBusiness();
		AprovPart.solicitar(u, p);
	}
	
	// get para puxar lista de aprovação por projeto
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/GetAprov/{idProjeto}")
	public List<AprovacaoParticipante> listarProjeto(@PathParam("idProjeto") int id) {
		AprovacaoParticipanteDao dao = FactoryDao.createAprovacaoParticipanteDao();
		return dao.listarProjeto(id);	
	}
	
	// post aceitar participação no projeto 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/Aceitar/{id}")
	public void aceitar(@PathParam("id") int id) {

		AprovacaoParticipanteDao daoAprov = FactoryDao.createAprovacaoParticipanteDao();
		AprovacaoParticipante AprovPart = daoAprov.getObjById(id);

		AprovacaoParticipanteBusiness AprovPartBusiness = new AprovacaoParticipanteBusiness();
		AprovPartBusiness.aceitar(AprovPart);
	}
	
	// post recusar participação no projeto 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/Recusar/{id}")
	public void recusar(@PathParam("id") int id) {

		AprovacaoParticipanteDao daoAprov = FactoryDao.createAprovacaoParticipanteDao();
		AprovacaoParticipante AprovPart = daoAprov.getObjById(id);

		AprovacaoParticipanteBusiness AprovPartBusiness = new AprovacaoParticipanteBusiness();
		AprovPartBusiness.recusar(AprovPart);
	}
	
	// iniciar projeto
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/iniciar/{id}")
	public String iniciarProjeto(@PathParam("id") int id) {
		ProjetoBusiness pBus = new ProjetoBusiness();
		String result = pBus.inciar(id);
		return gson.toJson(result);
	}
	
	// post recusar participação no projeto 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/concluir/{id}")
	public String concluirProjeto(@PathParam("id") int id) {
		ProjetoBusiness pBus = new ProjetoBusiness();
		String result = pBus.concluir(id);
		return gson.toJson(result);
	}
	
	// get para puxar todos os meus projetos do banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/buscaPorUsuario/{id}")
	public List<Projeto> buscarPorUsuario(@PathParam("id") String id) {
		ProjetoBusiness pBus = new ProjetoBusiness();
		return pBus.projetosPorUsuario(Integer.parseInt(id));
	}
	
	// get para puxar todos os meus projetos do banco..
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)	
	@Path("/cards/{id}")
	public List<CardsDashBoard> buscaCards(@PathParam("id") int id) {
		ProjetoBusiness pBus = new ProjetoBusiness();
		return pBus.gerarCardsProjeto(id);
	}
	
}
