package projeto.business;

import java.util.List;

import projeto.dao.ComentarioUsuarioDao;
import projeto.dao.UsuarioDao;
import projeto.entity.ComentarioUsuario;
import projeto.entity.Usuario;

public class ComentarioUsuarioBusiness {
	
	public void create(ComentarioUsuario c, int idUsuarioCriador){
		UsuarioDao userDao = new UsuarioDao();
		Usuario uCriador = userDao.getObjById(idUsuarioCriador);
		c.setEnviaComentario(uCriador);
		ComentarioUsuarioDao dao = new ComentarioUsuarioDao();		
		dao.salvar(c);
	}
	
	public List<ComentarioUsuario> listaPorComentariosRecebidosPeloUsuario(int id){
		ComentarioUsuarioDao dao = new ComentarioUsuarioDao();
		return dao.listarPorUsuarioQueRecebeComentario(id); 
	}
	
	public List<ComentarioUsuario> listaPorComentariosGeradosPeloUsuario(int id){
		ComentarioUsuarioDao dao = new ComentarioUsuarioDao();
		return dao.listarPorUsuarioQuefazComentario(id);
	}
	
	public List<ComentarioUsuario> listaPorComentariosGeradosDentroDoProjeto(int id){
		ComentarioUsuarioDao dao = new ComentarioUsuarioDao();
		return dao.listarOsComentariosGeradosNoProjeto(id);			
	}
	
	public void alterarComentario (ComentarioUsuario c, int idUsuarioCriador){
		UsuarioDao userDao = new UsuarioDao();
		Usuario uCriador = userDao.getObjById(idUsuarioCriador);
		c.setEnviaComentario(uCriador);
		ComentarioUsuarioDao dao = new ComentarioUsuarioDao();
		dao.alterar(c);
	}
	
	public void excluirComentario (ComentarioUsuario c){
		ComentarioUsuarioDao dao = new ComentarioUsuarioDao();
		dao.excluir(c);
	}
}
