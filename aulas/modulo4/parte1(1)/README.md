# Companies
*auth* === Precisa de Token de autorização;

**/companies**
--POST - Cria uma company
Parâmetros necessários:
[cnpj]:string, [company_name]:string,[trade_name]:string, [email]:string, [password]:string,

--*auth*GET - Retorna todas as companies ativas
Sem parâmetros

--*auth*PATCH - Desativa uma company
Parâmetros necessários:
Apenas o JWT.

--*auth*PATCH /avatar - Adicionar/altera o avatar da empresa
Parâmetros necessários:
Arquivo e JWT

**/passwordCompany**

--POST /forgot - Envia um email, que pode pegar pelo terminal
Parâmetros necessários:
[email]:string

--POST /reset
Parâmetros necessários:
[token]:string , [password]:string

**/profileCompany**

--*auth* PUT - Atualiza o perfil da company
Parâmetros necessários:
[cnpj]:string, [company_name]:string,[trade_name]:string, [email]:string, [password]:string,[old_password]:string
*[PASSWORD] E [OLD_PASSWORD] OPCIONAIS

--*auth* GET - Envia o perfil da company
Parâmetros necessários:
Apenas JWT

**/sessionsCompany**
--POST - cria token de autorização para logar
Parâmetros necessários:
[email]:string, [password]:string

# Customers
*auth* === Precisa de Token de autorização;

**/customers**
--POST - Cria um customer
Parâmetros necessários:
[name]:string,[date_birth]:Date, [email]:string, [phone]:string, [password]:string

--GET - Retorna todas os customers (apenas dev)
Sem parâmetros

--*auth*PATCH - Desativa um customer
Parâmetros necessários:
Apenas o JWT.

--*auth*PATCH /avatar - Adicionar/altera o avatar do usuario
Parâmetros necessários:
Arquivo e JWT

**/passwordCustomer**

--POST /forgot - Envia um email, que pode ser pego pelo terminal
Parâmetros necessários:
[email]:string

--POST /reset
Parâmetros necessários:
[token]:string , [password]:string

**/profileCustomer**

--*auth* PUT - Atualiza o perfil da customers
Parâmetros necessários:
[name]:string,[date_birth]:Date, [email]:string, [phone]:string, [password]:string
*[PASSWORD] E [OLD_PASSWORD] OPCIONAIS

--*auth* GET - Envia o perfil do customer
Parâmetros necessários:
Apenas JWT

**/sessionsCustomer**
--POST - cria token de autorização para logar
Parâmetros necessários:
[email]:string, [password]:string

# Items
*auth* === Precisa de Token de autorização;

**/items**

--*auth* POST - Cria um item
Parâmetros necessários:
[name]:string, [price]:number, [description]:string

--*auth* GET - Retorna todos os items de uma company
Apenas JWT

--*auth* DELETE - Deleta um item
[id_item]:string

--*auth* PATCH - Adiciona/altera imagem de um item
Parâmetros necessários:
JWT, [id_item]:string e ARQUIVO de imagem

# Orders
*auth* === Precisa de Token de autorização;

**/ordersCustomer**

--*auth* POST - Cria uma order com items
Parâmetros necessários:
[company_id]:string,[customer_id]:string,[status]:string,[description]:string, [items]:Items[]

--*auth* GET - Recebe todas as orders do customer
Parâmetros necessários:
JWT

**/ordersCompany**

--*auth* PATCH - Altera o status de uma order
Parâmetros necessários:
[id_company]:string, [id_order]:string, [status]:string

--*auth* GET - Recebe todas as orders da company
Parâmetros necessários:
JWT
