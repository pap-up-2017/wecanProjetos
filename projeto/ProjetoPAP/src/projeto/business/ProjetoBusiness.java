package projeto.business;

import java.util.ArrayList;
import java.util.List;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceProjetoDao;
import projeto.entity.Projeto;
import projeto.entity.Usuario;

public class ProjetoBusiness {
	
	// inicia o projeto
	public String inciar(int id){
		
		Projeto p;
		
		InterfaceProjetoDao<Projeto> dao = FactoryDao.createProjetoDao();
		try{
			p = dao.getObjById(id);
		}catch(Exception ex){
			return "projeto não encontrado";
		}
		
		p.setStatus("em andamento");
		dao.alterar(p);
		return "Projeto iniciado com sucesso."; 
	}

	public List<Projeto> projetosPorUsuario(int id){
		List<Projeto> projetosUsuario = new ArrayList<Projeto>();
		InterfaceProjetoDao<Projeto> dao = FactoryDao.createProjetoDao();
		List<Projeto> projetosBanco = dao.listar();
		System.out.println("Id usuario para pesquisa: "+id);
		for(Projeto p : projetosBanco){
			if(p.getOrganizador().getIdUsuario() == id){
				projetosUsuario.add(p);
			}else{
				for(Usuario u : p.getUsuarios()){
					if(u.getIdUsuario() == id){
						projetosUsuario.add(p);
					}
				}
			}
		}
		return projetosUsuario;
	}
}
