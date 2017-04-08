package projeto.util;

import java.util.Date;

public class Datas {
	
	private static int minute = 1000 * 60;
	private static int hour = minute * 60;
	private static int day = hour * 24;
	
	public static Date retornaDataAtual(){
		return new Date(System.currentTimeMillis());
	}

	public static int getMinute() {
		return minute;
	}

	public static void setMinute(int minute) {
		Datas.minute = minute;
	}

	public static int getHour() {
		return hour;
	}

	public static void setHour(int hour) {
		Datas.hour = hour;
	}

	public static int getDay() {
		return day;
	}

	public static void setDay(int day) {
		Datas.day = day;
	}
}
