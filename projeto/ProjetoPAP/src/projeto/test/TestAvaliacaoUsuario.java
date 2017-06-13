package projeto.test;

import java.util.List;

import org.junit.Test;

import projeto.business.AvaliacaoUsuarioBusiness;
import projeto.dao.ItemAvaliacaoUsuarioDao;
import projeto.dao.ProjetoDao;
import projeto.dao.UsuarioDao;
import projeto.entity.AvaliacaoUsuario;
import projeto.entity.ItemAvaliacaoUsuario;
import projeto.entity.Projeto;
import projeto.entity.Usuario;

public class TestAvaliacaoUsuario {
	
	// cadastra
	@Test
	public void cadastrarAvaliacaoUsuario (){
		// pega o item
		ItemAvaliacaoUsuarioDao itemDao = new ItemAvaliacaoUsuarioDao();
		ItemAvaliacaoUsuario item = itemDao.getObjById(1);

		// pega o projeto
		ProjetoDao pDao = new ProjetoDao(); 
		Projeto p = pDao.getObjById(1);
		
		//pega o usuario avaliado
		UsuarioDao uDao = new UsuarioDao();
		Usuario uAvaliado = uDao.getObjById(3);
		
		// cadastra
		AvaliacaoUsuario a = new AvaliacaoUsuario();
		a.setItemAvaliado(item); // seta item
		a.setProjeto(p); // seta Projeto
		a.setUsuarioAvaliado(uAvaliado); // seta o usuario avaliado
		a.setNotaAvaliacao(5);
		
		AvaliacaoUsuarioBusiness bus = new AvaliacaoUsuarioBusiness();
		// passa o id do avaliador
		bus.create(a, 2);
	}

	// lista por projeto
	@Test
	public void listarPorProjeto(){
		AvaliacaoUsuarioBusiness bus = new AvaliacaoUsuarioBusiness();
		List<AvaliacaoUsuario> aval = bus.buscarPorProjeto(1);
		if(aval.size() > 0){
			System.out.println("Numero de avaliacoes: "+aval.size());
		}
		else{
			System.out.println("Numero de avaliacoes: "+aval.size());
		}
	}
	
	// lista por usuario
	@Test
	public void listarPorUsuario(){
		AvaliacaoUsuarioBusiness bus = new AvaliacaoUsuarioBusiness();
		List<AvaliacaoUsuario> aval = bus.buscarPorUsuario(3);
		if(aval.size() > 0){
			System.out.println("Numero de avaliacoes: "+aval.size());
		}
		else{
			System.out.println("Numero de avaliacoes: "+aval.size());
		}
	}
	
	// lista por usuario
	@Test
	public void listarPorUsuarioAndProjeto(){
		AvaliacaoUsuarioBusiness bus = new AvaliacaoUsuarioBusiness();
		List<AvaliacaoUsuario> aval = bus.buscarPorUsuarioAndProjeto(2, 1);	
		if(aval.size() > 0){
			System.out.println("Numero de avaliacoes: "+aval.size());
		}
		else{
			System.out.println("Numero de avaliacoes: "+aval.size());
		}
	}
}
