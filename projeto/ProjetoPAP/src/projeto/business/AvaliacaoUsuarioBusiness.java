package projeto.business;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

import projeto.dao.AvaliacaoUsuarioDao;
import projeto.dao.UsuarioDao;
import projeto.entity.AvaliacaoUsuario;
import projeto.entity.Projeto;
import projeto.entity.Usuario;

public class AvaliacaoUsuarioBusiness {
	
	// cria
	public void create(AvaliacaoUsuario a, int idUsuarioAvaliador){
		AvaliacaoUsuarioDao aDao = new AvaliacaoUsuarioDao();
		UsuarioDao uDao = new UsuarioDao();
		// define o usuario que avaliou 
		Usuario u = uDao.getObjById(idUsuarioAvaliador);
		a.setUsuarioAvaliador(u);
		aDao.salvar(a);
	}
	
	// lista por projeto
	public List<AvaliacaoUsuario> buscarPorProjeto (int idProjeto){
		AvaliacaoUsuarioDao aDao = new AvaliacaoUsuarioDao();
		return aDao.listarPorProjeto(idProjeto);
	}
	
	// lista por usuario
	public List<AvaliacaoUsuario> buscarPorUsuario (int idUsuario){
		AvaliacaoUsuarioDao aDao = new AvaliacaoUsuarioDao();
		return aDao.listarPorUsuario(idUsuario);
	}
	
	// lista por projeto e usuario
	public List<AvaliacaoUsuario> buscarPorUsuarioAndProjeto (int idUsuario, int idProjeto){
		AvaliacaoUsuarioDao aDao = new AvaliacaoUsuarioDao();
		return aDao.listarPorProjetoAndUsuario(idUsuario, idProjeto);
	}
}
