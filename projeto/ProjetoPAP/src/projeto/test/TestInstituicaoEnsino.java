package projeto.test;

import java.util.List;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Cidade;
import projeto.entity.InstituicaoEnsino;

public class TestInstituicaoEnsino {
	
	@Test
	public void cadastrarInstituicao(){
		InstituicaoEnsino inst = new InstituicaoEnsino();
		
		inst.setNomeInstituicao("USB");
		InterfaceDao<Cidade> daoCidade = FactoryDao.createCidadeDao();
		inst.setCidadeInstituicao(daoCidade.getObjById(2));
		InterfaceDao<InstituicaoEnsino> daoInst = FactoryDao.createInstituicaoEnsinoDao();
		daoInst.salvar(inst);
		
	}
	
	@Test
	public void listarInstituicao() {		
		List<InstituicaoEnsino> universidades = FactoryDao.createInstituicaoEnsinoDao().listar();
		if (universidades.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarInstituicao(){
		InterfaceDao<InstituicaoEnsino> daoInst = FactoryDao.createInstituicaoEnsinoDao();
		InstituicaoEnsino inst = daoInst.getObjById(2);	
		inst.setNomeInstituicao("USP");
		daoInst.alterar(inst);
	}
	
	@Test
	public void excluirInstituicao(){
		InterfaceDao<InstituicaoEnsino> daoInst = FactoryDao.createInstituicaoEnsinoDao();
		InstituicaoEnsino inst = daoInst.getObjById(3);	
		daoInst.excluir(inst);
	}
}
