package projeto.test;

import java.sql.Date;
import java.text.SimpleDateFormat;

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

}
