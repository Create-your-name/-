namespace SPCService.src.Framework.Common;

public class Result<T> : Result
{
    //public SPCErrCodes error { get; set; }
    public T value { get; set; }

    public static implicit operator Result<T>(SPCErrCodes error)
    {
        return new Result<T>
        {
            error = error,
            value = default
        };
    }

    public static implicit operator Result<T>(T data)
    {
        return new Result<T>
        {
            value = data
        };
    }
}

public class Result
{
    public SPCErrCodes error { get; set; }

    public static implicit operator Result(SPCErrCodes error)
    {
        return new Result
        {
            error = error,
        };
    }
}
