package projeto.business;

import java.util.UUID;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Usuario;
import projeto.entity.UsuarioLogado;
import projeto.util.Datas;

public class UsuarioLogadoBusiness {
	
	public UsuarioLogado create(Usuario u){
		UsuarioLogado uLogged = new UsuarioLogado();
		
		uLogged.setIdUsuarioLogado(u.getIdUsuario());
		uLogged.setTipoUsuarioLogado(u.getTipoUsuario());
		uLogged.setDataCriacao(Datas.retornaDataAtual());
		uLogged.setToken(criarToken());
		InterfaceDao<UsuarioLogado> dao = FactoryDao.createUsuarioLogadoDao();
		dao.salvar(uLogged);
		return uLogged;
	}
	
	// gera token
	private String criarToken(){
		String uuid = UUID.randomUUID().toString();
		return uuid;
	}

}
