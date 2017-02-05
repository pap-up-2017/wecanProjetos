package projeto.test;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Projeto;

public class TestProjeto {
	
	@Test
	public void cadastrarProjeto(){
		Projeto p = new Projeto();
		
		p.setNome("Projeto X");
		
		Date data = new Date(System.currentTimeMillis());  
		SimpleDateFormat formatarDate = new SimpleDateFormat("yyyy-MM-dd"); 
		System.out.print(formatarDate.format(data));		
		p.setDataCriacao(data);
		
		
		InterfaceDao<Projeto> dao = FactoryDao.createProjetoDao();
		dao.salvar(p);
		
	}
	
	@Test
	public void listarProjeto() {		
		List<Projeto> projetos = FactoryDao.createProjetoDao().listar();
		if (projetos.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarProjeto(){
		InterfaceDao<Projeto> daoProj = FactoryDao.createProjetoDao();
		Projeto proj = daoProj.getObjById(1);	
		proj.setNome("Projeto Alterado");
		daoProj.alterar(proj);
	}
	
	@Test
	public void excluirProjeto(){
		InterfaceDao<Projeto> daoProj = FactoryDao.createProjetoDao();
		Projeto proj = daoProj.getObjById(3);	
		daoProj.excluir(proj);
	}

}
