package projeto.test;

import java.util.List;
import org.junit.Test;

import projeto.dao.AvaliacaoDao;
import projeto.dao.FactoryDao;
import projeto.dao.RespostaUsuarioDao;
import projeto.entity.Avaliacao;
import projeto.entity.RespostaAvaliacao;
import projeto.entity.RespostaUsuario;


public class TestRespostaUsuario {
	
	@Test
	public void cadastrarRespostaUsuario(){
		RespostaUsuario ru = new RespostaUsuario();
		
		RespostaAvaliacao ra = new RespostaAvaliacao();
		ra.setIdRespostaAvaliacao(1);
		ru.setRespostaAvaliacao(ra);
		RespostaUsuarioDao daoRespostaUsuario = FactoryDao.createRespostaUsuarioDao();
		daoRespostaUsuario.salvar(ru);
	}
	
	@Test
	public void listarRespostaUsuario() {		
		List<RespostaUsuario> respostaUsuarios = FactoryDao.createRespostaUsuarioDao().listar();
		if (respostaUsuarios.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarRespostaUsuario(){
		RespostaUsuarioDao daoRespostaUsuario = FactoryDao.createRespostaUsuarioDao();
		RespostaUsuario ru = daoRespostaUsuario.getObjById(2);	
		RespostaAvaliacao ra = new RespostaAvaliacao();
		ra.setIdRespostaAvaliacao(2);
		ru.setRespostaAvaliacao(ra);
		daoRespostaUsuario.alterar(ru);
	}
	
	@Test
	public void excluirRespostaUsuario(){
		RespostaUsuarioDao daoRespostaUsuario = FactoryDao.createRespostaUsuarioDao();
		RespostaUsuario ru = daoRespostaUsuario.getObjById(3);
		daoRespostaUsuario.excluir(ru);
	}

}
