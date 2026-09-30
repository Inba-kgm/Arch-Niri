#include<avr/io.h>
#include<avr/interrupt.h>
int main(){
    DDRB |= (1<<PB1);
	PORTB |= (1<<1);
    TCCR1A |= (1<<7)|(1<<1);
    TCCR1B |= (1<<4)|(1<<3)|(1<<0)|(1<<2);
    ICR1 = 31249;
    OCR1A = 7812;
    while(1){
        
    }
}