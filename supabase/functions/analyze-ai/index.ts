/// <reference lib="deno.ns" />

Deno.serve(async (req) => {

    const body = await req.json();
    
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    
    const prompt = `
    Analyze this construction feedback:
    
    ${body.feedbackText}
    
    Return:
    category,
    priority,
    responsibility
    `;
    
    const response = await fetch(
    "https://api.openai.com/v1/responses",
    {
    method:"POST",
    headers:{
    Authorization:`Bearer ${apiKey}`,
    "Content-Type":"application/json"
    },
    body: JSON.stringify({
    model:"gpt-4o-mini",
    input:prompt
    })
    }
    );
    
    const data = await response.json();
    
    return new Response(
    JSON.stringify(data),
    {
    headers:{
    "Content-Type":"application/json"
    }
    }
    );
    
    });