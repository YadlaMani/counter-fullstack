use anchor_lang::prelude::*;

declare_id!("Dt1Jy254GZUAUFCUcUSmSuAG3Enx1EJHvBEhRowaDQGH");
#[account]
#[derive(InitSpace)]
pub struct Counter{
    pub count:u64,
    pub bump:u8
}
#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
       let counter=&mut ctx.accounts.counter;
       counter.bump=ctx.bumps.counter;
        msg!("Counter account created! Current count:{}",counter.count);
        msg!("Counter bump:{}",counter.bump);
        Ok(())
    }
    pub fn increment(ctx:Context<Increment>)->Result<()>{
        let counter=&mut ctx.accounts.counter;
        msg!("Before increment:{}",counter.count);
        counter.count+=1;
        msg!("After increment:{}",counter.count);
        Ok(())
    }
    pub fn decrement(ctx:Context<Decrement>)->Result<()>{
        let counter=&mut ctx.accounts.counter;
        msg!("Before decrement:{}",counter.count);
        counter.count-=1;
        msg!("After decrement:{}",counter.count);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info>{
    #[account(mut)]
    pub user:Signer<'info>,
    #[account(
        init,
        seeds=[b"counter"],
        bump,
        payer=user,
        space=8+Counter::INIT_SPACE
    )]
    pub counter:Account<'info,Counter>,
    pub system_program:Program<'info,System>
}
#[derive(Accounts)]
pub struct Increment<'info>{
    #[account(mut,
        seeds=[b"counter"],
        bump=counter.bump
    )]
    pub counter:Account<'info,Counter>
}
#[derive(Accounts)]
pub struct Decrement<'info>{
    #[account(mut,
    seeds=[b"counter"],
    bump=counter.bump)]
    pub counter:Account<'info,Counter>
}
