package projeto.business;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceProjetoDao;
import projeto.entity.Projeto;

public class ProjetoBusiness {
	
	public String inciar(int id){
		
		Projeto p;
		
		InterfaceProjetoDao<Projeto> dao = FactoryDao.createProjetoDao();
		try{
			p = dao.getObjById(id);
		}catch(Exception ex){
			return "projeto não encontrado";
		}
		
		p.setStatus("Fechado");
		dao.alterar(p);
		return "Projeto iniciado com sucesso."; 
	}

}
