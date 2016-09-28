life = new LifeGame(3,3);
exlife = new LifeGame(3,3);
exlife1 = new LifeGame(3,3);
exlife2 = new LifeGame(3,3);
exlife3 = new LifeGame(3,3);
//exlife1为全满
/*
1 1 1
1 1 1
1 1 1
*/
for(var i=0;i<3;i++) 
{
	exlife1.grid[i] = [];
	for(var j=0;j<3;j++) 
	{
		exlife1.grid[i][j] = {'state':1, 'nextState':1};
		exlife1.remainLifes++;
	}
}
//exlife2为全空
/*
0 0 0
0 0 0
0 0 0
*/
for(var i=0;i<3;i++) 
{
	exlife2.grid[i] = [];
	for(var j=0;j<3;j++) 
	{
		exlife2.grid[i][j] = {'state':0, 'nextState':0};	
	}
}
//exlife3为特例
/*
1 0 1
0 0 0
0 0 1
*/
for(var i=0;i<3;i++) 
{
	exlife3.grid[i] = [];
	for(var j=0;j<3;j++) 
	{
		exlife3.grid[i][j] = {'state':0, 'nextState':1};	
	}
}
exlife3.grid[0][0] = {'state':1, 'nextState':1};
exlife3.grid[2][2] = {'state':1, 'nextState':1};
exlife3.grid[2][0] = {'state':1, 'nextState':1};
//mocha测试单元
describe('LifeGame',function(){
	it('should be a function',function(){
		assert.isFunction(LifeGame);
	});
	it('should have 2 arguments',function(){
		assert.equal(LifeGame.length,2);
	});
	describe('LifeGame.prototype.initRandom',function(){
		it('should be a function',function(){
			assert.isFunction(exlife.initRandom);
		});
		it('should have 1 arguments',function(){
			assert.equal(exlife.initRandom.length,1);
		});
		context('examples:',function(){
			it('100% life should be right',function(){
				exlife.initRandom(100);
				assert.sameDeepMembers(exlife.grid,exlife1.grid);
			});
			
			it('0% life should be right',function(){
				exlife.initRandom(0);
				assert.sameDeepMembers(exlife.grid,exlife2.grid);
			});
		});
	});
	describe('LifeGame.prototype.aliveCountAround',function(){
		it('should be a function',function(){
			assert.isFunction(exlife.aliveCountAround);
		});
		it('should have 2 arguments',function(){
			assert.equal(exlife.aliveCountAround.length,2);
		});
		context('examples:',function(){
			it('should get right result in 3 situations',function(){
				assert.equal(exlife1.aliveCountAround(1,1),8);		
				assert.equal(exlife2.aliveCountAround(1,1),0);
				assert.equal(exlife3.aliveCountAround(1,1),3);
			});
		});
	});

	describe('LifeGame.prototype.mapX',function(){
		it('should be a function',function(){
			assert.isFunction(exlife.mapX);
		});
		it('should have 1 arguments',function(){
			assert.equal(exlife.mapX.length,1);
		});
		context('examples:',function(){
			it('should get right result when x is out of range',function(){
				assert.equal(exlife1.grid[1][0],exlife1.grid[1][exlife1.mapX(-3)]);
				assert.equal(exlife2.grid[1][0],exlife2.grid[1][exlife2.mapX(-3)]);
				assert.equal(exlife3.grid[1][0],exlife3.grid[1][exlife3.mapX(-3)]);
			});
			
		});
		
	});
	describe('LifeGame.prototype.mapY',function(){
		it('should be a function',function(){
			assert.isFunction(exlife.mapY);
		});
		it('should have 1 arguments',function(){
			assert.equal(exlife.mapY.length,1);
		});
		context('examples:',function(){
			it('should get right result when y is out of range',function(){
				assert.equal(exlife1.grid[0][0],exlife1.grid[exlife1.mapY(3)][0]);
				assert.equal(exlife2.grid[0][0],exlife2.grid[exlife2.mapY(3)][0]);
				assert.equal(exlife3.grid[0][0],exlife3.grid[exlife3.mapY(3)][0]);
			});
			
		});
		
	});
	describe('LifeGame.prototype.nextState',function(){
		it('should be a function',function(){
			assert.isFunction(exlife.nextState);
		});
		it('should have 2 arguments',function(){
			assert.equal(exlife.nextState.length,2);
		});
		context('examples:',function(){
			it('should get right state in 3 situations',function(){
				assert.equal(exlife1.nextState(1,1),0);
				assert.equal(exlife2.nextState(1,1),0);
				assert.equal(exlife3.nextState(1,1),1);	
			});
			
		});
		
	});

	describe('LifeGame.prototype.calcNextState',function(){
		it('should be a function',function(){
			assert.isFunction(exlife.calcNextState);
		});
		context('examples:',function(){
			it('should get right lifes in next generation in 3 sitations',function(){
				exlife1.calcNextState();
				exlife2.calcNextState();
				exlife3.calcNextState();
				assert.equal(exlife1.remainLifes,9);
				assert.equal(exlife2.remainLifes,0);
				assert.equal(exlife3.remainLifes,0);	
			});
			
		});
		
	});

	describe('LifeGame.prototype.changeNextState',function(){
		it('should be a function',function(){
			assert.isFunction(exlife.changeNextState);
		});
		context('examples:',function(){
			it('exlife[2][2] should change into right state',function(){
				exlife3.changeNextState();
				assert.equal(exlife3.grid[2][2].state,1);	
			});

			
		});
		
	});
	describe('LifeGame.prototype.nextAround',function(){
		it('should be a function',function(){
			assert.isFunction(exlife.nextAround);
		});
		
		
	});

	describe('LifeGame.prototype.isAlive',function(){
		it('should be a function',function(){
			assert.isFunction(exlife.isAlive);
		});
		it('should have 2 arguments',function(){
			assert.equal(exlife.isAlive.length,2);
		});
		context('examples:',function(){
			it('every cell should be judged correctly.',function(){
				assert.equal(exlife1.isAlive(1,1),true);
				assert.equal(exlife2.isAlive(1,1),false);
				assert.equal(exlife3.isAlive(0,0),true);
				assert.equal(exlife3.isAlive(1,1),true);
			});
			
		});
	});

});

describe('init',function(){
	it('should be a function',function(){
		assert.isFunction(init);
	});
});

describe('restart',function(){
	it('should be a function',function(){
		assert.isFunction(restart);
	});
});

describe('beginlife',function(){
	it('should be a function',function(){
		assert.isFunction(beginlife);
	});
	it('should have 3 arguments',function(){
		assert.equal(beginlife.length,3);
	});
});

describe('update',function(){
	it('should be a function',function(){
		assert.isFunction(update);
	});
});
describe('draw',function(){
	it('should be a function',function(){
		assert.isFunction(draw);
	});
});
describe('pause',function(){
	it('should be a function',function(){
		assert.isFunction(pause);
	});
	
});
