package projeto.test;

import java.util.List;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Cidade;
import projeto.entity.Estado;

public class TestCidade {
	
	@Test
	public void cadastrarCidade(){
		Cidade c = new Cidade();
		
		c.setNomeCidade("Curitiba");
		InterfaceDao<Estado> daoEstado = FactoryDao.createEstadoDao();
		c.setEstadoCidade(daoEstado.getObjById(1));
		InterfaceDao<Cidade> daoCidade = FactoryDao.createCidadeDao();
		daoCidade.salvar(c);
	}
	
	@Test
	public void listarCidade() {		
		List<Cidade> cidades = FactoryDao.createCidadeDao().listar();
		if (cidades.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarCidade(){
		InterfaceDao<Cidade> daoCidade = FactoryDao.createCidadeDao();
		InterfaceDao<Estado> daoEstado = FactoryDao.createEstadoDao();
		Cidade c = daoCidade.getObjById(2);	
		c.setNomeCidade("São Paulo");
		c.setEstadoCidade(daoEstado.getObjById(3));
		daoCidade.alterar(c);
	}
	
	@Test
	public void excluirCidade(){
		InterfaceDao<Cidade> daoCidade = FactoryDao.createCidadeDao();
		Cidade c = daoCidade.getObjById(3);
		daoCidade.excluir(c);
	}

}
