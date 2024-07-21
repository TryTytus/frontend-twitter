
export let styles = `

[data-supertokens~=input] {
    background-color: black;
    color: hsl(var(--muted-foreground) / var(--tw-text-opacity));

    /*
    padding-top: 0.5rem;
    padding-bottom: 0.5rem; 
    padding-left: 0.75rem;
    padding-right: 0.75rem; 
    border-radius: 0.375rem; 
    border-width: 1px; 
    height: 2.5rem; 

    width: 100%; 
    font-size: 0.875rem;
    line-height: 1.25rem; 
    */
}

[data-supertokens~=container] {
    background-color: rgb(9, 9, 11);
    border: 1px solid rgb(39, 39, 42);
    border-radius: 8px;

    padding-bottom: 1rem;

    --palette-primary: 255, 255, 255;
    --palette-textTitle: 255, 255, 255;
}

[data-supertokens~=headerTitle] {
    color: white;
    font-size: 1.5rem;
}

[data-supertokens~=headerSubtitle] {
    color: hsl(var(--muted-foreground) / var(--tw-text-opacity));
}

[data-supertokens~=label] {
    color: hsl(var(--muted-foreground) / var(--tw-text-opacity));
}

[data-supertokens~=button] {
    border-color: white;
    background-color: white;
    color: black;
}


[data-supertokens~=superTokensBranding] {
    display: none;
}


`