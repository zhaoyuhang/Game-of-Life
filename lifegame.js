			//lifegame主体函数
			function LifeGame(row, col) 
			{
			    this.row = row;
			    this.col = col;
			    this.grid = [];
			    this.remainLifes = 0;
			    this.nextRemainLifes = 0;
			    this.generations = 1;
			    this.isRunning = 0;
			}

			//随机初始化生命，按百分比随机生成生命数量
			LifeGame.prototype.initRandom = function(percent) 
			{
			    this.remainLifes = 0;
			    this.generations = 1;
			    for(var i=0;i<this.row;i++) 
			    {
			        this.grid[i] = [];
			        for(var j=0;j<this.col;j++) 
			        {
			            if (Math.random() * 100 <= percent) 
			            {
			                this.grid[i][j] = {'state':1, 'nextState':1};
			                this.remainLifes++;
			                this.nextRemainLifes = this.remainLifes;
			            } 
			            else 
			            {
			                this.grid[i][j] = {'state':0, 'nextState':0};
			            }
			        }
			    }
			}

			//计算某个生命的邻居生存个数
			LifeGame.prototype.aliveCountAround = function(x,y) 
			{
			    return this.grid[this.mapX(x-1)][this.mapY(y-1)].state + 
			            this.grid[this.mapX(x-1)][y].state + 
			            this.grid[this.mapX(x-1)][this.mapY(y+1)].state + 
			            this.grid[x][this.mapY(y-1)].state + 
			            this.grid[x][this.mapY(y+1)].state + 
			            this.grid[this.mapX(x+1)][this.mapY(y-1)].state + 
			            this.grid[this.mapX(x+1)][y].state + 
			            this.grid[this.mapX(x+1)][this.mapY(y+1)].state;
			}

			//左右边界的映射，超出左边界则认为是右边界关联，如-1会映射为是最右侧,这样会让游戏的宽度是无限延展的
			LifeGame.prototype.mapX = function(x) 
			{
			    return (x >= this.row || x < 0 ) ? (x % this.row + this.row) % this.row : x;
			}

			//上下边界的映射，参见mapX
			LifeGame.prototype.mapY = function(y) 
			{
			    return (y >= this.col || y < 0 ) ? (y%this.col + this.col) % this.col: y;
			}

			//计算某个生命的下一回合的生存状态
			LifeGame.prototype.nextState = function(x,y) 
			{
			    var aliveCountAround = this.aliveCountAround(x,y);
			    if (aliveCountAround >= 4) 
			    {
			        return 0;
			    } 
			    else if(aliveCountAround === 3) 
			    {
			        return 1;
			    } 
			    else if(aliveCountAround >= 2) 
			    {
			        return this.grid[x][y].nextState;
			    } 
			    else 
			    {
			        return 0;
			    }
			}

			//计算所有生命的下一回合的生存状态
			LifeGame.prototype.calcNextState = function() 
			{
			    this.nextRemainLifes = 0;
			    for(var i=0;i<this.row;i++) 
			    {
			        for(var j=0;j<this.col;j++) 
			        {
			            this.grid[i][j].nextState = this.nextState(i, j);
			            if (this.grid[i][j].nextState === 1) 
			            {
			                this.nextRemainLifes++;
			            }
			               
			        }
			    }
			}

			//转换到下一回合的生存状态
			LifeGame.prototype.changeNextState = function() 
			{
			  for(var i=0;i<this.row;i++) 
			  {
			      for(var j=0;j<this.col;j++) 
			      {

			          this.grid[i][j].state = this.grid[i][j].nextState;
			      }
			  }
			  this.remainLifes = this.nextRemainLifes;
			  this.generations++;
			}

			//下一回合
			LifeGame.prototype.nextAround = function() 
			{
			    this.calcNextState();
			    this.changeNextState();
			}

			//某个生命是否存活
			LifeGame.prototype.isAlive = function(x,y) 
			{
			    return this.grid[x][y].state === 1;
			}

			var life;
			var Timer = 0;
			var canvas = new fabric.Canvas('canvas');
			canvas.renderOnAddRemove = false;
			var lifes = [];

			function init()
			{
				var rect = new fabric.Rect({
					top:0,
					left:0,
					width:600,
					height:600,
					fill:'white',
					selectable:false,
					strokeWidth:1,
					stroke:'black'
				});
				canvas.add(rect);
				canvas.renderAll();
			}

			

			function restart()
			{
				var size = parseInt(document.getElementById('lifeSize').value);
                if (isNaN(size) || size <= 0) 
                {
                    alert('请输入正确数值');
                    return;
                }
               var percent = parseInt(document.getElementById('lifePercent').value);
                if (isNaN(percent) || percent > 100 || percent < 0) 
                {
                    alert('请输入正确数值');
                    return;
                }

                if (Timer != 0)
                {
                    clearInterval(Timer);
                }
                canvas.clear();
                init();
                beginlife(size, size, percent);
			}

			function beginlife(row,col,percent)
			{
				life = new LifeGame(row,col);
				life.isRunning = 1;
				life.initRandom(percent);
				var width  = 600/life.col;
                var height = 600/life.row;
                for(var i = 0;i < life.row;i++)
                {
                	lifes[i] = [];
                	for(var j = 0;j<life.col;j++)
                	{
                		lifes[i][j] = new fabric.Rect({
                			top:    i*height,
                            left:   j*width,
                            width:  width,
                            height: height,
                            fill:   'black',
                            selectable: false,
                            stroke: 'rgba(100,200,200,0.5)',
                            strokeWidth: 1,
                            visible:    false
                		});
                		canvas.add(lifes[i][j]);
                	}
                }

                update();
                Timer = setInterval(update,200);
			}

			function update()
			{
				draw();
				if(life.isRunning == 1)
				{
				document.getElementById('remainLifes').innerText = life.remainLifes;
                document.getElementById('generations').innerText = life.generations;
                life.nextAround(); 
                }	
			}

			function draw()
			{
				for(var i=0;i<life.row;i++) 
				{
                    for(var j=0;j<life.col;j++) 
                    {
                        if (life.isAlive(i,j))  
                        {
                           lifes[i][j].visible = true;
                        } 
                        else 
                        {
                           lifes[i][j].visible = false;
                        }
                    }
                }
                canvas.renderAll();

			}

			function pause()
			{
				if(life.isRunning == 1)
				{
					life.isRunning = 0;
					document.getElementById('pause').value = "continue";
				}
				else
				{
					life.isRunning = 1;
					document.getElementById('pause').value = "pause";
				}
				
			}

